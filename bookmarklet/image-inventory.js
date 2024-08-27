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

// Function to retrieve the title of a webpage and image details given its URL
async function getPageTitleAndImages(url) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const dom = new DOMParser().parseFromString(html, "text/html");
        const titleElement = dom.querySelector("title");
        const title = titleElement ? titleElement.textContent.trim() : "Title not found";

        let imageDetails = [];

        // Extract <img> tags
        const images = dom.querySelectorAll("img");
        imageDetails = imageDetails.concat(Array.from(images).map(img => ({
            src: img.getAttribute("src") || "No source",
            alt: img.getAttribute("alt") || "No alt text",
            altMissing: img.hasAttribute("alt") ? "No" : "Yes",
            type: "img"
        })));

        // Extract background images
        const elements = dom.querySelectorAll("*");
        elements.forEach(el => {
            const style = window.getComputedStyle(el);
            const bgImage = style.getPropertyValue("background-image");
            if (bgImage && bgImage !== "none") {
                const urlMatch = bgImage.match(/url\((['"])?(.*?)\1\)/);
                if (urlMatch && urlMatch[2]) {
                    imageDetails.push({
                        src: urlMatch[2],
                        alt: "N/A",
                        altMissing: "N/A",
                        type: "background"
                    });
                }
            }
        });

        // Extract inline SVGs
        const svgs = dom.querySelectorAll("svg");
        imageDetails = imageDetails.concat(Array.from(svgs).map(svg => ({
            src: "Inline SVG",
            alt: svg.getAttribute("aria-label") || svg.getAttribute("title") || "No description",
            altMissing: (svg.hasAttribute("aria-label") || svg.hasAttribute("title")) ? "No" : "Yes",
            type: "svg"
        })));

        // Extract <picture> and <source> tags
        const pictures = dom.querySelectorAll("picture");
        imageDetails = imageDetails.concat(Array.from(pictures).map(picture => {
            const source = picture.querySelector("source");
            const img = picture.querySelector("img");
            return {
                src: source ? source.getAttribute("srcset") || "No source" : "No source",
                alt: img ? img.getAttribute("alt") || "No alt text" : "No alt text",
                altMissing: img && img.hasAttribute("alt") ? "No" : "Yes",
                type: "picture"
            };
        }));

        return { title, images: imageDetails };

    } catch (error) {
        console.error("Error retrieving page title and images for URL:", url, error);
        return { title: "Title not found", images: [] };
    }
}

// Function to convert sitemap to array of objects
async function convertSitemapToArray(url) {
    try {
        const sitemap = await loadSitemap(url);
        const urls = await processSitemap(sitemap);

        // Retrieve titles and images for each URL
        for (let urlObj of urls) {
            const pageData = await getPageTitleAndImages(urlObj.loc);
            urlObj.title = pageData.title;
            urlObj.images = pageData.images;
        }

        return urls;
    } catch (error) {
        console.error("Error converting sitemap to array:", error);
        return [];
    }
}

function makeCsv(data) {
    const headers = ["ID", "Title", "URL", "Image Path", "Alt Text", "Alt Missing", "Image Type"];
    let csv = headers.join(",") + "\n"; // CSV header
    let ID = 1; // Initialize the counter

    data.forEach(function(row) {
        const paddedID = "A11Y" + String(ID).padStart(3, "0"); // Pad the ID with zeros to ensure three digits

        // If no images found, add a single row with empty image fields
        if (row.images.length === 0) {
            csv += `"${paddedID}","${row.title}","${row.loc}","No images found","N/A","N/A","N/A"\n`;
        } else {
            // Generate a row for each image
            row.images.forEach(image => {
                csv += `"${paddedID}","${row.title}","${row.loc}","${image.src}","${image.alt}","${image.altMissing}","${image.type}"\n`;
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
    link.setAttribute("download", "image_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Execute the process
(async function(){
    const data = await convertSitemapToArray("/sitemap.xml");
    const csv = makeCsv(data);
    triggerDownload(csv);
})();
