(() => {

    let giOrder = 1;

    const traverseFrames = (doc) => {

        // Get all focusable elements

        const elements = doc.querySelectorAll(

            "[tabindex], button, a[href], area, input:not([type=hidden]), select, textarea, iframe"

        );

        initHelper(doc, elements);

        // Recursively traverse frames and iframes

        for (const type of ['frame', 'iframe']) {

            const frames = doc.getElementsByTagName(type);

            for (const frame of frames) {

                try {

                    traverseFrames(frame.contentWindow.document);

                } catch (e) {

                    // Ignore cross-origin frames

                }

            }

        }

    };

    const initHelper = (doc, nodeList) => {
    
        const normal = [];
        const positive = [];

        for (const el of nodeList) {

            if (!el.hasAttribute('disabled')) {

                const tabindex = el.getAttribute('tabindex');

                if (tabindex !== null) {

                    const tabIndexValue = parseInt(tabindex, 10);

                    if (tabIndexValue === 0) {

                        normal.push(el);

                    } else if (tabIndexValue > 0) {

                        positive.push(el);

                    }

                } else {

                    normal.push(el);

                }

            }

        }

        positive.sort((a, b) => parseInt(a.getAttribute('tabindex'), 10) - parseInt(b.getAttribute('tabindex'), 10)

    );

    const insertLabel = (el, isInline = false) => {

        const span = doc.createElement('span');

        span.textContent = giOrder++;
        span.style.backgroundColor = 'darkblue';
        span.style.color = 'white';
        span.style.fontSize = 'small';
        span.style.padding = '0 .1em';

        if (isInline) span.style.display = 'inline-block';

            el.style.border = 'thin dotted currentColor';
            el.parentNode.insertBefore(span, el);

        };

        for (const el of positive) {

            insertLabel(el);

        }

        for (const el of normal) {

            insertLabel(el, true);

        }

    };

    traverseFrames(document);

})();
  