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

// Function to retrieve the title of a webpage and video details given its URL
async function getPageTitleAndVideos(url) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const dom = new DOMParser().parseFromString(html, "text/html");
        const titleElement = dom.querySelector("title");
        const title = titleElement ? titleElement.textContent.trim() : "Title not found";

        let videoDetails = [];

        // Extract <video> elements and their sources
        const videos = dom.querySelectorAll("video");
        videos.forEach(video => {
            let src = video.getAttribute("src") || null;

            // Check for source elements within the video
            const sources = video.querySelectorAll("source");
            sources.forEach(source => {
                let sourceSrc = source.getAttribute("src") || "No source";
                if (sourceSrc.startsWith("//")) {
                    sourceSrc = `https:${sourceSrc}`;
                }
                videoDetails.push({
                    src: sourceSrc,
                    hasTrack: video.querySelector("track") ? "Yes" : "No",
                });
            });

            // Add the src attribute of the video element if present
            if (src) {
                if (src.startsWith("//")) {
                    src = `https:${src}`;
                }
                videoDetails.push({
                    src: src,
                    hasTrack: video.querySelector("track") ? "Yes" : "No",
                });
            }
        });

        return { title, videos: videoDetails };

    } catch (error) {
        console.error("Error retrieving page title and videos for URL:", url, error);
        return { title: "Title not found", videos: [] };
    }
}

// Function to convert sitemap to array of objects
async function convertSitemapToArray(url) {
    try {
        const sitemap = await loadSitemap(url);
        const urls = await processSitemap(sitemap);

        // Retrieve titles and videos for each URL
        for (let urlObj of urls) {
            const pageData = await getPageTitleAndVideos(urlObj.loc);
            urlObj.title = pageData.title;
            urlObj.videos = pageData.videos;
        }

        return urls;
    } catch (error) {
        console.error("Error converting sitemap to array:", error);
        return [];
    }
}

// Function to create CSV from data
function makeCsv(data) {
    const headers = ["ID", "Title", "URL", "Video Path", "Has Track"];
    let csv = headers.join(",") + "\n"; // CSV header
    let ID = 1; // Initialize the counter

    data.forEach(function(row) {
        const paddedID = "VID" + String(ID).padStart(3, "0"); // Pad the ID with zeros to ensure three digits

        // If no videos found, add a single row with empty video fields
        if (row.videos.length === 0) {
            csv += `"${paddedID}","${row.title}","${row.loc}","No videos found","N/A"\n`;
        } else {
            // Generate a row for each video
            row.videos.forEach(video => {
                csv += `"${paddedID}","${row.title}","${row.loc}","${video.src}","${video.hasTrack}"\n`;
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
    link.setAttribute("download", "video_report.csv");
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
