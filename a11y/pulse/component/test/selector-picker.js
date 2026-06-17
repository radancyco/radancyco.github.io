javascript: (() => {

    try {

        // Minimize Pulse

        const pulse = document.querySelector("a11y-pulse-component");
        pulse.shadowRoot.querySelector(".a11y-pulse__btn--minimize").click();

        const cssEsc = (s) => (window.CSS && CSS.escape ? CSS.escape(s) : String(s).replace(/[^a-zA-Z0-9_-]/g, "$&"));

        const getSel = (el) => {

            if (!el || el === document.body) return "body";

            if (el.id) return "#" + cssEsc(el.id);

            const parts = [];

            let e = el;

            while (e && e.nodeType === 1 && e !== document.body) {

                let sel = e.nodeName.toLowerCase();

                if (e.classList && e.classList.length) sel += "." + [...e.classList].slice(0, 2).map(cssEsc).join(".");

                const sib = [...e.parentNode.children].filter((x) => x.nodeName === e.nodeName);

                if (sib.length > 1) sel += `:nth-of-type(${sib.indexOf(e) + 1})`;

                parts.unshift(sel);

                e = e.parentElement;

            }

            return parts.join(" > ");

        };

        let active = true;

        const onClick = (ev) => {

            if (!active) return;

            ev.preventDefault();

            ev.stopPropagation();

            active = false;

            const sel = getSel(ev.target);

            navigator.clipboard.writeText(sel).catch(() => {});

            alert("Selector copied to clipboard:\n" + sel + "\n\nThe selector has been copied!");

            document.removeEventListener("click", onClick, true);

        };

        alert("Selector picker: click an element to copy a CSS selector.");

        document.addEventListener("click", onClick, true);

    } catch (e) {

        alert("Selector picker failed: " + e.message);

    }

})();
