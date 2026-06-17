javascript: (() => {

    const callback = () => {

        const run = () => {

            // Remove previously injected <strong> elements with specific classes

            document.querySelectorAll("strong.openSpan, strong.closeSpan").forEach(el => el.remove());


            // Outline and style <ul>, <ol>, <dl>

            document.querySelectorAll("ul, ol, dl").forEach(el => {

                el.style.outline = "green 2px solid";
                el.style.padding = "2px";
                el.style.listStylePosition = "inside";

            });

            // Highlight <p> tags that are children of <ul> or <ol>

            document.querySelectorAll("ul p, ol p").forEach(p => {

                p.style.outline = "2px solid red";

                const parentList = p.closest("ul, ol");

                if (parentList) {

                    parentList.style.outline = "2px solid red";

                    parentList.insertAdjacentHTML("afterbegin", `<strong class="openSpan" style="color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;">❌ NO CHILD LI</strong>`);

                }

            });

            const markers = {

                ul: "&lt;ul&gt;📝",
                ol: "&lt;ol&gt;🔢",
                dl: "&lt;dl&gt;📕",
                li: "&lt;li&gt;",
                dd: "&lt;dd&gt;",
                dt: "&lt;dt&gt;"

            };

            Object.entries(markers).forEach(([tag, label]) => {

                document.querySelectorAll(tag).forEach(el => {

                    el.insertAdjacentHTML("afterbegin",`<strong class="openSpan" style="color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;">${label}</strong>`);
                    el.insertAdjacentHTML("beforeend",`<strong class="closeSpan" style="color:black;font-family:sans-serif;font-weight:bold;font-size:small;background-color:yellow;">&lt;/${tag}&gt;</strong>`);

                });

            });

            // Feedback for success or failure

            const listTags = document.querySelectorAll("ul, ol, li, dd, dt, dl");

            if (!listTags.length) {

                const msg = document.createElement("strong");

                msg.id = "failure";
                msg.setAttribute("role", "status");
                msg.style.cssText = "color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;margin:0 2px; padding:2px;";
                msg.textContent = "No Lists Found on Page: " + document.title;
                
                document.body.prepend(msg);

                setTimeout(() => msg.remove(), 6000);

            } else {

                const msg = document.createElement("div");

                msg.id = "success";
                msg.setAttribute("role", "alert");
                msg.style.cssText = "position:absolute;width:0;height:0;clip:rect(0,0,0,0);";
                msg.textContent = "Success! Lists Found on Page: " + document.title;

                document.body.appendChild(msg);

                setTimeout(() => msg.remove(), 3000);

            }

            // Remove original script if it was injected

            if (script && script.parentNode) script.remove();

        };

        run();

    };

    // const script = document.querySelector("script[src$='lists.js']");

    // if (script && script.parentNode) script.remove(); // Clean up prior instance if needed

    callback(); // Run directly since we no longer depend on jQuery loading

})();
  