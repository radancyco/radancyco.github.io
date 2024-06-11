
var documentObj = document, bookmarkId = "phltsbkmklt", bookmarkElement = documentObj.getElementById(bookmarkId), iframes = documentObj.querySelectorAll("iframe"), index = 0, iframeCount = iframes.length;

if (bookmarkElement) {

    // Function to remove the element from shadow DOMs recursively

    function removeFromShadowRoots(root) {

        for (var element of root.querySelectorAll("*")) {

            if (element.shadowRoot) {

                element.shadowRoot.getElementById(bookmarkId).remove();

                removeFromShadowRoots(element.shadowRoot);

            }

        }

    }

    // Remove the bookmark element from the main document

    bookmarkElement.remove();

    // If there are iframes, try to remove the bookmark element from their documents

    if (iframeCount) {

        for (index = 0; index < iframeCount; index++) {

            try {

                iframes[index].contentWindow.document.getElementById(bookmarkId).remove();

                removeFromShadowRoots(iframes[index].contentWindow.document);

            } catch (error) {

                console.log(error);

            }

        }

    }

    // Remove the bookmark element from shadow DOMs in the main document

    removeFromShadowRoots(documentObj);

} else {

    // Create a new style element with the bookmark ID

    var styleElement = documentObj.createElement("style");

    styleElement.id = bookmarkId;

    styleElement.appendChild(documentObj.createTextNode("*{line-height:1.5 !important;letter-spacing:0.12em !important;word-spacing:0.16em !important;}" + "p{margin-bottom:2em !important;}"));

    // Function to apply the style element to shadow DOMs recursively

    function applyStyleToShadowRoots(root) {

        for (var element of root.querySelectorAll("*")) {

            if (element.shadowRoot) {

                element.shadowRoot.appendChild(styleElement.cloneNode(true));

                applyStyleToShadowRoots(element.shadowRoot);

            }

        }

    }

    // Append the style element to the head of the main document

    documentObj.getElementsByTagName("head")[0].appendChild(styleElement);

    // If there are iframes, try to append the style element to their documents

    for (index = 0; index < iframeCount; index++) {

        try {

            iframes[index].contentWindow.document.getElementsByTagName("head")[0].appendChild(styleElement.cloneNode(true));

            applyStyleToShadowRoots(iframes[index].contentWindow.document);

        } catch (error) {

            console.log(error);

        }

    }

    // Apply the style element to shadow DOMs in the main document

    applyStyleToShadowRoots(documentObj);

}

