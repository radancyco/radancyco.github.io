// Function to load the sitemap from URL

function loadSitemap(url) {

    return fetch(url).then(function(response) {

        return response.text();

    }).then(function(text) {

        return (new DOMParser()).parseFromString(text, "text/xml");

    }).catch(function(error) {});

}

// Function to expand the URL set

function expandUrlSet(urlset) {

    let urls = [];
    const allowedSubfolders = ["/job/", "/location/", "/employment/", "/category/", "/business/", "/job-location/"];
    let subfolderCounts = {}; // Object to store counts for each allowed subfolder

    for (let url of urlset.children) {

        let loc = url.querySelector("loc").textContent;
        let found = false;

        // Check if the URL contains any allowed subfolder

        for (let subfolder of allowedSubfolders) {

            if (loc.includes(subfolder)) {

                found = true;

                // Increment the count for this subfolder

                subfolderCounts[subfolder] = (subfolderCounts[subfolder] || 0) + 1;

                // Check if the count exceeds the limit (10)

                if (subfolderCounts[subfolder] <= 5) {

                    let row = { loc };

                    urls.push(row);

                }

                break;

            }

        }

        // If the URL doesn't contain any allowed subfolder, capture it without restriction

        if (!found) {

            let row = { loc };

            urls.push(row);

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

    }

    return Promise.resolve([]);

}

// Function to retrieve the title of a webpage given its URL

async function getPageTitle(url) {

    try {

        const response = await fetch(url);

        const html = await response.text();
        const dom = new DOMParser().parseFromString(html, "text/html");
        const title = dom.querySelector("title").textContent;

        return title;

    } catch (error) {

        console.error("Error retrieving page title:", error);

        return "Title not found"; // Default title if an error occurs

    }

}

// Function to convert sitemap to array of objects

function convertSitemapToArray(url) {

    return loadSitemap(url).then(processSitemap).then(async function(urls) {

        // Retrieve titles for each URL

        for (let url of urls) {

            url.title = await getPageTitle(url.loc);

        }

        return urls;

    });

}

function makeCsv(data) {

    let csv = "Title, URL, W3C Validation, Error, Heading Validation, Error, Screenshot, WAVE Validation, Errors, Contrast Errors, Screenshot, Radancy Notes, ID\n"; // CSV header with renamed columns
    let ID = 1; // Initialize the counter

    data.forEach(function(row) {

        let paddedID = String(ID).padStart(3, "0"); // Pad the ID with zeros to ensure three digits

        csv += '"' + row.title + '","' + row.loc + '","https://validator.w3.org/nu/?showsource=yes&showoutline=yes&showimagereport=yes&doc=' + row.loc + '"," ","https://validator.w3.org/nu/?showsource=yes&showoutline=yes&showimagereport=yes&doc=' + row.loc + '#headingoutline"," "," ","https://wave.webaim.org/report#/' + row.loc + '"," "," "," "," ","A11Y' + paddedID + '"\n'; // Reversed and renamed columns

        ID++; // Increment the counter

    });

    return csv;

}

// Function to trigger CSV download

function triggerDownload(csv) {

    let blob = new Blob([csv], { type: "text/csv" });
    let url = URL.createObjectURL(blob);

    window.location.href = url;

}

// Call the functions to convert sitemap to array, convert to CSV, and trigger download

convertSitemapToArray("/sitemap.xml").then(makeCsv).then(triggerDownload);