// Function to load the sitemap from URL
function loadSitemap(url) {
    return fetch(url).then(function(response) {
        return response.text();
    }).then(function(text) {
        return (new DOMParser()).parseFromString(text, "text/xml");
    }).catch(function(error) {
        console.error("Error loading sitemap:", error);
    });
}

// Function to expand the URL set
function expandUrlSet(urlset) {
    let urls = [];
    const allowedSubfolders = ["/job/", "/location/", "/employment/", "/category/", "/business/", "/job-location/"];
    let subfolderCounts = {}; // Object to store counts for each allowed subfolder

    for (let url of urlset.children) {
        let locElement = url.querySelector("loc");
        if (!locElement) continue;
        let loc = locElement.textContent;
        let found = false;

        // Check if the URL contains any allowed subfolder
        for (let subfolder of allowedSubfolders) {
            if (loc.includes(subfolder)) {
                found = true;

                // Increment the count for this subfolder
                subfolderCounts[subfolder] = (subfolderCounts[subfolder] || 0) + 1;

                // Check if the count exceeds the limit (5)
                if (subfolderCounts[subfolder] <= 5) {
                    urls.push({ loc });
                }
                break;
            }
        }

        // If the URL doesn't contain any allowed subfolder, capture it without restriction
        if (!found) {
            urls.push({ loc });
        }
    }

    return Promise.resolve(urls);
}

// Function to process the sitemap
function processSitemap(sitemap) {
    sitemap = sitemap.documentElement;

    switch (sitemap.tagName) {
        case "urlset":
            return expandUrlSet(sitemap);
        default:
            console.error("Unsupported sitemap format:", sitemap.tagName);
            return [];
    }
}

// Turn user input into a usable CSS selector.
// Accepts standard selectors (".my-button", "#id", "a[href]") as-is.
// Also accepts two shorthands so users don't have to hand-write bracket syntax:
//   - a bare attribute name (e.g. "data-fancybox") -> [data-fancybox] (attribute exists)
//   - "attr=value" or "attr:value" (e.g. "data-src=youtube") -> [data-src*="youtube"]
//     (attribute value CONTAINS "youtube" anywhere). Prefix the "=" with ^ or $ to
//     match "starts with" or "ends with" instead, e.g. "data-src^=youtube".
function normalizeSelector(input) {
    const trimmed = input.trim();

    const partialMatch = trimmed.match(/^([a-zA-Z_][a-zA-Z0-9_-]*)\s*([*^$]?=|:)\s*(.+)$/);
    if (partialMatch) {
        let [, attr, operator, value] = partialMatch;
        if (operator === ":" || operator === "=") {
            operator = "*="; // default to "contains" for the plain shorthand
        }
        const escapedValue = value.trim().replace(/"/g, '\\"');
        return `[${attr}${operator}"${escapedValue}"]`;
    }

    const looksLikeBareAttribute = /^[a-zA-Z_][a-zA-Z0-9_-]*$/.test(trimmed);
    if (looksLikeBareAttribute) {
        return `[${trimmed}]`;
    }

    return trimmed;
}

// Function to retrieve the title of a webpage and matching elements given its URL
async function getPageTitleAndMatches(url, selector) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const dom = new DOMParser().parseFromString(html, "text/html");
        const titleElement = dom.querySelector("title");
        const title = titleElement ? titleElement.textContent.trim() : "Title not found";

        let matchDetails = [];

        const matches = dom.querySelectorAll(selector);
        matches.forEach(el => {
            let snippet = el.outerHTML || "";
            if (snippet.length > 300) {
                snippet = snippet.substring(0, 300) + "...";
            }

            matchDetails.push({
                tag: el.tagName.toLowerCase(),
                id: el.getAttribute("id") || "",
                classes: el.getAttribute("class") || "",
                text: (el.textContent || "").trim().substring(0, 100),
                html: snippet,
            });
        });

        return { title, matches: matchDetails };

    } catch (error) {
        console.error("Error retrieving page title and matches for URL:", url, error);
        return { title: "Title not found", matches: [] };
    }
}

// Function to convert sitemap to array of objects
async function convertSitemapToArray(url, selector) {
    try {
        const sitemap = await loadSitemap(url);
        const urls = await processSitemap(sitemap);

        // Retrieve titles and matches for each URL
        for (let urlObj of urls) {
            const pageData = await getPageTitleAndMatches(urlObj.loc, selector);
            urlObj.title = pageData.title;
            urlObj.matches = pageData.matches;
        }

        return urls;
    } catch (error) {
        console.error("Error converting sitemap to array:", error);
        return [];
    }
}

// Function to create CSV from data
function makeCsv(data, selector) {
    const headers = ["ID", "Title", "URL", "Selector", "Tag", "Element ID", "Classes", "Text Snippet", "Element HTML"];
    let csv = headers.join(",") + "\n"; // CSV header
    let ID = 1; // Initialize the counter

    data.forEach(function(row) {
        const escape = (value) => String(value).replace(/"/g, '""');

        // If no matches found, add a single row noting that
        if (row.matches.length === 0) {
            const paddedID = "SEL" + String(ID).padStart(3, "0");
            csv += `"${paddedID}","${escape(row.title)}","${escape(row.loc)}","${escape(selector)}","No matches found","N/A","N/A","N/A","N/A"\n`;
        } else {
            // Generate a row for each matching element
            row.matches.forEach(match => {
                const paddedID = "SEL" + String(ID).padStart(3, "0"); // Pad the ID with zeros to ensure three digits
                csv += `"${paddedID}","${escape(row.title)}","${escape(row.loc)}","${escape(selector)}","${escape(match.tag)}","${escape(match.id)}","${escape(match.classes)}","${escape(match.text)}","${escape(match.html)}"\n`;
            });
        }

        ID++; // Increment the counter
    });

    return csv;
}

// Function to trigger CSV download
function triggerDownload(csv) {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "selector_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Execute the process
(async function(){
    const rawInput = window.prompt("Enter a CSS class, attribute, or selector to search for on each page (e.g. .my-button, data-fancybox, data-src=youtube for a partial value match, or a full selector like [data-fancybox=\"true\"]):");

    if (!rawInput || !rawInput.trim()) {
        console.warn("No selector entered. Aborting.");
        return;
    }

    const selector = normalizeSelector(rawInput);

    try {
        document.querySelector(selector);
    } catch (error) {
        alert(`"${selector}" is not a valid CSS selector.`);
        return;
    }

    const data = await convertSitemapToArray("/sitemap.xml", selector);
    const csv = makeCsv(data, selector);
    triggerDownload(csv);
})();
