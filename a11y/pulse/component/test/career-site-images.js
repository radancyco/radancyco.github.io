(() => {

    const shadowHost = document.querySelector("a11y-pulse-component");
    const shadowContainer = shadowHost.shadowRoot;
    const hasList = shadowContainer.querySelector(".status-container--career-site-images ul");

    if(hasList) {

        hasList.remove();

    } 

    const ul = document.createElement("ul");
    const statusContainer = shadowContainer.querySelector(".status-container--career-site-images");
   
    statusContainer.appendChild(ul);

    const statusList = shadowContainer.querySelector(".status-container--career-site-images ul");
    const statusMessage = shadowContainer.querySelector(".status-message--career-site-images");

    statusMessage.classList.remove("status-message--complete");
    statusMessage.textContent = "🔎 Fetching images. Please be patient. Go make a sandwich. Actually, make me one too. Mmmm sammiches.";

    // Function to load the sitemap from URL

    const loadSitemap = async (url) => {

        try {

            const response = await fetch(url);
            const text = await response.text();
            return (new DOMParser()).parseFromString(text, "text/xml");

        } catch (error) {

            console.error("Error loading sitemap:", error);

        }

    };

    // Function to expand the URL set

    const expandUrlSet = (urlset) => {

        const urls = [];
        const allowedSubfolders = ["/job/", "/location/", "/employment/", "/category/", "/business/", "/job-location/"];
        const subfolderCounts = {};

        for (const url of urlset.children) {

            const locElement = url.querySelector("loc");
            if (!locElement) continue;

            const loc = locElement.textContent;
            let found = false;

            for (const subfolder of allowedSubfolders) {

                if (loc.includes(subfolder)) {

                    found = true;
                    subfolderCounts[subfolder] = (subfolderCounts[subfolder] || 0) + 1;

                    if (subfolderCounts[subfolder] <= 5) {

                        urls.push({ loc });

                    }

                    break;

                }

            }

            if (!found) {

                urls.push({ loc });

            }

        }

        return Promise.resolve(urls);

    };

    // Function to process the sitemap

    const processSitemap = (sitemap) => {

        sitemap = sitemap.documentElement;

        switch (sitemap.tagName) {

            case "urlset":

                return expandUrlSet(sitemap);

            default:

                console.error("Unsupported sitemap format:", sitemap.tagName);
                return [];

        }

    };

    // Function to retrieve the title of a webpage and image details given its URL, appending to the list

    const getPageTitleAndImages = async (url) => {

        try {

            const response = await fetch(url);
            const html = await response.text();
            const dom = new DOMParser().parseFromString(html, "text/html");
            const titleElement = dom.querySelector("title");
            const title = titleElement ? titleElement.textContent.trim() : "Title not found";

            // Append to list like in original getPageTitle

            const li = document.createElement("li");
            const a = document.createElement("a");
            const img = document.createElement("img");

            if (statusList.children.length) {

                statusMessage.textContent = "🛠️ One moment. Building image inventory...";
        
            }

            a.href = url;
            a.textContent = url;
            a.target = "_blank";

            img.src = "https://radancy.dev/a11y/pulse/component/img/new-tab.png";
            img.alt = "(Opens in new window)";

            a.appendChild(img);
            li.appendChild(a);
            statusList.prepend(li);

            let imageDetails = [];

            // Extract <img> tags

            const images = dom.querySelectorAll("img");

            imageDetails = imageDetails.concat(Array.from(images).map((img) => {

                let src = img.getAttribute("src") || "No source";

                if (src.startsWith("//")) {

                    src = `https:${src}`;

                }

                let altText = img.getAttribute("alt");

                if (altText && altText.trim() === "") {

                    altText = "No alt text";

                }

                return {

                    src,
                    alt: altText || "No alt text",
                    altMissing: img.hasAttribute("alt") ? "No" : "Yes",
                    type: "img"

                };

            }));

            // Extract background images

            const elements = dom.querySelectorAll("*");

            elements.forEach((el) => {

                const style = window.getComputedStyle(el);
                const bgImage = style.getPropertyValue("background-image");

                if (bgImage && bgImage !== "none") {

                    const urlMatch = bgImage.match(/url\((['"])?(.*?)\1\)/);

                    if (urlMatch && urlMatch[2]) {

                        let src = urlMatch[2];

                        if (src.startsWith("//")) {

                            src = `https:${src}`;

                        }

                        imageDetails.push({

                            src,
                            alt: "N/A",
                            altMissing: "N/A",
                            type: "background"

                        });

                    }

                }

            });

            // Extract inline SVGs

            const svgs = dom.querySelectorAll("svg");

            imageDetails = imageDetails.concat(Array.from(svgs).map((svg) => ({

                src: "Inline SVG",
                alt: svg.getAttribute("aria-label") || svg.getAttribute("title") || "No description",
                altMissing: (svg.hasAttribute("aria-label") || svg.hasAttribute("title")) ? "No" : "Yes",
                type: "svg"

            })));

            return { title, images: imageDetails };

        } catch (error) {

            console.error("Error retrieving page title and images for URL:", url, error);

            // Append error li like in getPageTitle error block

            const li = document.createElement("li");
            const a = document.createElement("a");
            const img = document.createElement("img");

            a.href = url;
            a.textContent = "Error retrieving: " + url;
            a.target = "_blank";

            img.src = "https://radancy.dev/a11y/pulse/img/new-tab.png";
            img.alt = "(Opens in new window)";

            a.appendChild(img);
            li.appendChild(a);
            li.classList.add("status-error");
            statusList.prepend(li);

            return { title: "Title not found", images: [] };

        }

    };

    // Function to convert sitemap to array of objects

    const convertSitemapToArray = async (url) => {

        try {

            const sitemap = await loadSitemap(url);
            const urls = await processSitemap(sitemap);

            for (const urlObj of urls) {

                const pageData = await getPageTitleAndImages(urlObj.loc);

                urlObj.title = pageData.title;
                urlObj.images = pageData.images;

            }

            return urls;

        } catch (error) {

            console.error("Error converting sitemap to array:", error);
            return [];

        }

    };

    const makeCsv = (data) => {

        const headers = ["ID", "Title", "URL", "Image Path", "Alt Text", "Alt Attribute Missing?", "Image Type"];

        let csv = headers.join(",") + "\n"; // CSV header
        let ID = 1; // Initialize the counter

        const seenAltTexts = new Set();

        data.forEach((row) => {

            row.images.forEach((image) => {

                if (image.alt === "No alt text" || !seenAltTexts.has(image.alt)) {

                    const paddedID = "A11YIMG" + String(ID).padStart(3, "0");

                    csv += `"${paddedID}","${row.title}","${row.loc}","${image.src}","${image.alt}","${image.altMissing}","${image.type}"\n`;

                    if (image.alt !== "No alt text") {

                        seenAltTexts.add(image.alt);

                    }

                    ID++;
                }

            });

            if (row.images.length === 0) {

                const paddedID = "A11YIMG" + String(ID).padStart(3, "0");

                csv += `"${paddedID}","${row.title}","${row.loc}","No images found","N/A","N/A","N/A"\n`;

                ID++;

            }

        });

        return csv;

    };

    // Function to trigger CSV download

    const triggerDownload = (csv, file) => {

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.setAttribute("download", file);

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);

    };

    // Call the functions to convert sitemap to array, convert to CSV, and trigger download

    // Split pathname into segments

    const pathSegments = location.pathname.split('/').filter(Boolean);

    // Check if the first segment looks like a language code
        
    const isLangFolder = /^[a-z]{2}(-[A-Z]{2})?$/.test(pathSegments[0]);
    
    // Build sitemap URL
        
    const sitemapUrl = isLangFolder ? `${location.origin}/${pathSegments[0]}/sitemap.xml` : `${location.origin}/sitemap.xml`;
    
    convertSitemapToArray(sitemapUrl).then((data) => {
        
        const csv = makeCsv(data);
        const domain = location.hostname.replace(/\./g, '-');
        const file = `${domain}-images.csv`;
    
        triggerDownload(csv, file);

        statusMessage.classList.add("status-message--complete");
        statusMessage.textContent = `🎉 Complete! Please check your download folder (${file}).`;
        
        
    });

})();
