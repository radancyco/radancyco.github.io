/*!

    Radancy: Accessibility Pulse - Heading Outline

    Contributor(s):
    Michael "Spell" Spellacy

*/

(function() {

    "use strict";

    const pageElement = document.querySelector(".page-content");
    const pageLoader = document.querySelector(".loader");
    const urlParam = new URLSearchParams(window.location.search);
    const pageTest = urlParam.get("url");
    let pageElementHref = "https://validator.w3.org/nu/?showoutline=yes&doc=" + pageTest;

    const pageError = document.createElement("div");
    pageError.classList.add("warning-info");
    pageError.innerHTML = `We're sorry, the content you are looking for can't be displayed right now. Try refreshing your page. If the issue persists please contact the <a href='mailto:a11y@radancy.com?subject=Accessibility%20Pulse%20Issue'>Accessibility Team</a>.`;

    const fetchPage = async () => {
        
        try {

            const response = await fetch(pageElementHref);

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const urlPage = document.querySelector(".url-page");
            const w3cPage = document.querySelector(".url-w3c");

            urlPage.innerHTML = "<a href=" + pageTest + " target='_blank'>" + pageTest + " <span class='visually-hidden'>(opens in new window)</span></a>";
            w3cPage.innerHTML = "<a href=" + pageElementHref + "#headingoutline target='_blank'>" + pageElementHref + " <span class='visually-hidden'>(opens in new window)</span></a>";

            const text = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, "text/html");
            const fragment = doc.getElementById("headingoutline");

            if (fragment) {

                pageLoader.setAttribute("hidden", "");
                pageElement.append(fragment);

            } else {

                throw new Error("No results found in the response.");

            }

        } catch (error) {

            pageLoader.setAttribute("hidden", "");
            console.error("Error fetching or parsing the page:", error);
            pageElement.append(pageError);

        }

    };

    fetchPage();
    
})();