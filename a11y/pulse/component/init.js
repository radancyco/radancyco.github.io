---
layout: null
---

{% include variables.html %}

/*!

  Radancy: Accessibility Pulse

  Contributor(s):
  Michael "Spell" Spellacy

*/

(() => {

  "use strict";

  // Display which Disclosure is in use via console:

  console.log("%cAccessibility Pulse%cv{{ pulseVersion }}", "background: #2d2d2d; color: #fff; padding: 6px 10px; border-radius: 16px 0 0 16px; font-weight: 600;" , "background: #6e00ee; color: #fff; padding: 6px 10px; border-radius: 0 16px 16px 0; font-weight: 600;");

  // Commonly used Classes, Data Attributes, States, Strings, etc.

  const getLocation = location.href;
  const shadowHost = document.querySelector("a11y-pulse-component");
  const shadowContainer = shadowHost.shadowRoot;
  const a11yPulse = shadowContainer.querySelector(".a11y-pulse");
  const a11yPulseClose = shadowContainer.querySelector(".a11y-pulse__btn--close");
  const a11yPulseMin = shadowContainer.querySelector(".a11y-pulse__btn--minimize");
  const isCareerSite = document.querySelector('script[src*="plumrnizr-a"]');

  // Show Modal

  a11yPulse.show();

  // Focus on button (autofocus does odd things)

  a11yPulseClose.focus();

  // Minimize Button 

  a11yPulseMin.setAttribute("aria-pressed", "false");

  const minPulse = () => {

    a11yPulse.removeAttribute("style");

    if (a11yPulseMin.getAttribute("aria-pressed") === "true") {

      a11yPulseMin.setAttribute("aria-pressed", "false");
      a11yPulse.removeAttribute("data-minimize");
    
    } else {
    
      a11yPulseMin.setAttribute("aria-pressed", "true");
      a11yPulse.setAttribute("data-minimize", "");
    
    }

  };

  a11yPulseMin.addEventListener("click", minPulse);

  // Close Button 

  const closePulse = () => {
    
    a11yPulse.setAttribute("closing", "");

    a11yPulse.addEventListener("animationend", () => {

        shadowHost.remove();

        const a11yPulseScript = document.querySelector("#a11y-pulse-component");

        a11yPulseScript.remove();

    });

  };
  
  a11yPulseClose.addEventListener("click", closePulse);
  
  document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

      closePulse();
    }

  });
  
  // Anchor Links
  // Anchors do not work in the Shadow DOM, so we gotta fake it. 

  const anchorLink = shadowContainer.querySelectorAll("a[href^='#']");

  anchorLink.forEach((link) => {

    link.addEventListener("click", (e) => {

      const href = link.getAttribute("href");
      const id = href.slice(1);
      const target = shadowContainer.getElementById(id);

      target.click();
      target.scrollIntoView();

    });

  });

  // Move Dialog

  const a11yPulseMove = shadowContainer.querySelector(".a11y-pulse__banner");

  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let startLeft = 0;
  let startTop = 0;

  a11yPulseMove.addEventListener("mousedown", (e) => {

    isDragging = true;

    // Starting mouse position

    startX = e.clientX;
    startY = e.clientY;

    // Starting dialog position (strip 'px' and convert to number)

    startLeft = parseInt(window.getComputedStyle(a11yPulse).insetInlineStart, 10) || 0;
    startTop = parseInt(window.getComputedStyle(a11yPulse).insetBlockStart, 10) || 0;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    e.preventDefault(); // Prevent text selection

  });

  function handleMouseMove(e) {
  
    if (!isDragging) return;

    a11yPulse.setAttribute("data-move", "");

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    a11yPulse.style.insetInlineStart = `${startLeft + dx}px`;
    a11yPulse.style.insetBlockStart = `${startTop + dy}px`;

  }

  function handleMouseUp() {
  
    isDragging = false;
  
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);

    a11yPulse.removeAttribute("data-move");

  }

  // HTML Validation Form 

  const limitField = shadowContainer.querySelector("#contentToValidate")
  const limitCount = shadowContainer.querySelector("#charlimit");
  const limitNum = Number(limitCount.innerHTML); // Convert to number

  const limitText = () => {

    if (limitField.value.length > limitNum - ((limitNum * 0.10) + 1)) {

      limitCount.classList.add("alert");

    } else {

      limitCount.classList.remove("alert");

    }

    if (limitField.value.length > limitNum) {

      limitField.value = limitField.value.substring(0, limitNum);

    } else {

      limitCount.innerHTML = limitNum - limitField.value.length;
    
    }

  }

  // Count characters on load

  if (limitField.value.length <= limitNum) {

    limitCount.innerHTML = limitNum - limitField.value.length;

    limitText();

  }

  // Key Functions

  limitField.addEventListener("keydown", () => {

    limitText();

  });

  limitField.addEventListener("keyup", () => {

    limitText();

  });

  // ** Pulse Functions **

  // Validate WAVE

  const btnValidateWAVE = shadowContainer.querySelectorAll(".validation-wave");

  btnValidateWAVE.forEach((btn) => {

      const getLink = btn.getAttribute("href");
      btn.setAttribute("href", `${getLink}report#/${getLocation}`);

  });

  // Validate W3C

  const btnValidateW3C = shadowContainer.querySelectorAll(".validation-w3c");

  btnValidateW3C.forEach((btn) => {

      const getLink = btn.getAttribute("href");
      btn.setAttribute("href", `${getLink}?showsource=yes&showoutline=yes&showimagereport=yes&doc=${getLocation}`);

  });

  // Validate Headings

  const btnValidateHeading = shadowContainer.querySelectorAll(".validation-heading");

  btnValidateHeading.forEach((btn) => {

      const getLink = btn.getAttribute("href");
      btn.setAttribute("href", `${getLink}${getLocation}#headingoutline`);

  });

  // Validate Images

  const btnValidateImage = shadowContainer.querySelectorAll(".validation-image-external");

  btnValidateImage.forEach((btn) => {

      const getLink = btn.getAttribute("href");
      btn.setAttribute("href", `${getLink}${getLocation}#imagereport`);

  });

  // Validate CSS

  const btnValidateCSS = shadowContainer.querySelectorAll(".validation-css");

  btnValidateCSS.forEach((btn) => {

      const getLink = btn.getAttribute("href");
      btn.setAttribute("href", `${getLink}validator?profile=css3&warning=0&uri=${getLocation}`);

  });

  // Validate Links

  const btnValidateLinks = shadowContainer.querySelectorAll(".validation-link"); 

  btnValidateLinks.forEach((btn) => {
  
      const getLink = btn.getAttribute("href");
      btn.setAttribute("href", `${getLink}?uri=${getLocation}&hide_type=all&depth=&check=Check`);
  
  });

  // Validate Spelling

  const btnValidateSpelling = shadowContainer.querySelectorAll(".validation-spelling");

  btnValidateSpelling.forEach((btn) => {
      
      const getLink = btn.getAttribute("href");
      btn.setAttribute("href", `${getLink}?uri=${getLocation}&lang=${document.querySelector("html").getAttribute("lang")}&suggest=on`);
      
  });

  // Validate Structured Data

  const btnValidateStructuredData = shadowContainer.querySelectorAll(".validation-seo");

  btnValidateStructuredData.forEach((btn) => {
  
      const getLink = btn.getAttribute("href");
      btn.setAttribute("href", `${getLink}?url=${getLocation}`);
  
  });

  // Validate HTML by Direct Input

  const formValidation = shadowContainer.querySelector("#submitPartialPage");
  const formValidationContent = shadowContainer.querySelector("#contentToValidate");
  const formValidationSubmit = shadowContainer.querySelector("#submitValidate");
  const topHtml = '<!DOCTYPE html>' + "\n" + '<html lang="en">' + "\n" + '<head>' + "\n\t" + '<meta charset="utf-8">' + "\n\t" + '<title>Untitled Document</title>' + "\n" + '</head>' + "\n" + '<body>' + "\n" + "\n";
  const bottomHtml = "\n\n</body></html>";
  
  formValidationSubmit.addEventListener("click", (e) => {
  
      e.preventDefault();
  
      const textareaContent = formValidationContent.value;
  
      const newInput = document.createElement("input");
      newInput.setAttribute("type", "hidden");
      newInput.setAttribute("id", "contentField");
      newInput.setAttribute("name", "content");
      newInput.setAttribute("value", topHtml + textareaContent + bottomHtml);
      formValidation.appendChild(newInput);
  
      formValidation.submit();
  
  }, false);

  // Bookmarklet Loader
  
  const btnValidateScript = shadowContainer.querySelectorAll("button[data-script]");

  btnValidateScript.forEach((btn) => {

      btn.addEventListener("click", function() {

          const bookMarklet = document.createElement("script");
          bookMarklet.setAttribute("src", this.getAttribute("data-script"));

          if(btn.hasAttribute("data-lang")) {

            const language = btn.getAttribute("data-lang");

            bookMarklet.setAttribute("data-lang", language);

          }

          if(btn.hasAttribute("data-id")) {

            const scriptID = btn.getAttribute("data-id");

            bookMarklet.setAttribute("id", scriptID);

          }

          document.body.append(bookMarklet);

      });    
  
  });


  // AI Opt-in 

  const checkbox = shadowContainer.querySelector("#ai-img-optin");
  const genBtn = shadowContainer.querySelector("#btn-gen-ai");

  checkbox.addEventListener("change", () => {
  
    if (checkbox.checked) {
  
      genBtn.removeAttribute("disabled");
  
    } else {
  
      genBtn.setAttribute("disabled", "");
  
    }
  
  });

  /*!

    Radancy Component Library: Accordion (ShadowDOM Variant)

    Contributor(s):
    Michael "Spell" Spellacy

 */

  const initAccordion = () => {

    // Classes, data attributes, states, and strings.

    const accordionClass = ".accordion";
    const accordionCloseClassName = "accordion__close";
    const accordionCloseClass = `.${accordionCloseClassName}`;
    const accordionToggleClassName = "accordion__toggle";
    const accordionArrowClassName = "accordion__arrow";
    const accordionToggleClass = `.${accordionToggleClassName}`;
    const accordionToggleAllClass = ".accordion__toggle-all";
    const accordionHeadingClassName = "accordion__heading";
    const accordionPanelClass = ".accordion__panel";
    const accordionDataActiveState = "data-active";
    const accordionDataDefaultOpen = "data-open";
    const accordionDataOverlay = "data-overlay";
    const accordionDataCloseButton = "data-close";
    const accordionDataDisableAnchor = "data-disable-anchor";
    const accordionDataFixedHeight = "data-fixed-height";
    const accordionDataMultiOpen = "data-multiple";
    const accordionDataRemoveArrow = "data-remove-arrow";
    const accordions = shadowContainer.querySelectorAll(accordionClass);
    const URLFragment = location.hash.slice(1);

    // Language

    const accordionCloseButtonLabel = window.accordionCloseButtonLabel;

    // Loop through and set up all accordions on the page.

    accordions.forEach((accordion, index) => {

      // Set unique ID on all accordions.

      accordion.setAttribute("id", `accordion-${index + 1}`);

      // Get all buttons within accordion.

      const accordionToggles = accordion.querySelectorAll(accordionToggleClass);

      // Get all panels within accordion.

      const accordionPanels = accordion.querySelectorAll(accordionPanelClass);

      // Set variable for selected button target.

      let expandedButton = null;

      // Get "Toggle All " button.

      const btnToggleAll = accordion.querySelector(accordionToggleAllClass);

      // Loop through each toggle button.

      accordionToggles.forEach(btn => {

        // Get button ID. Remember: ID's should always be unique.

        const buttonID = btn.getAttribute("id");

        // Set up each button.

        btn.setAttribute("aria-controls", `accordion-${buttonID}`);
        btn.setAttribute("aria-expanded", "false");

        // Add Toggle Arrow

        if (!accordion.hasAttribute(accordionDataRemoveArrow)) {

          const toggleState = document.createElement("span");

          toggleState.setAttribute("aria-hidden", "true");
          toggleState.classList.add(accordionArrowClassName);
          btn.prepend(toggleState);

        }

        // Handle button click.

        btn.addEventListener("click", () => {

          const isExpanded = btn.getAttribute("aria-expanded") === "true";

          if (!accordion.hasAttribute(accordionDataMultiOpen)) {

            accordionToggles.forEach(button => {

              button.setAttribute("aria-expanded", "false");

            });

          }

          btn.setAttribute("aria-expanded", isExpanded ? "false" : "true");

          // Add "data-active" attribute on the parent accordion. Might be useful to achieve interesting UX.

          accordion.setAttribute(accordionDataActiveState, "");

          // If "Toggle All" button is present, then always set it to false.

          if (btnToggleAll) {

            btnToggleAll.setAttribute("aria-pressed", "false");

          }

          // Place focus on close button if present.

          if (accordion.hasAttribute(accordionDataCloseButton)) {

            btn.nextElementSibling.querySelector(accordionCloseClass).focus();

          }

          // Add URL Fragment to URL if not disabled.

          if (!accordion.hasAttribute(accordionDataDisableAnchor)) {

            history.pushState(null, null, `#${buttonID}`);

          }

        });

        // Default open based on URL fragment or data-open attribute.

        if (buttonID === URLFragment || (!expandedButton && btn.hasAttribute(accordionDataDefaultOpen))) {

          // Add "data-active" to parent.

          accordion.setAttribute(accordionDataActiveState, "");

          // Open targeted element.

          expandedButton = btn;

        }

      });

      if (expandedButton) {

        expandedButton.setAttribute("aria-expanded", "true");

      }

      // If "Toggle All" button is present...

      if (btnToggleAll) {

        btnToggleAll.setAttribute("aria-pressed", "false");

        if (!accordion.hasAttribute(accordionDataRemoveArrow)) {

          const toggleAllState = document.createElement("span");

          toggleAllState.setAttribute("aria-hidden", "true");
          toggleAllState.classList.add(accordionArrowClassName);
          btnToggleAll.append(toggleAllState);

        }

        // Toggle All Event

        btnToggleAll.addEventListener("click", function () {

          const isPressed = this.getAttribute("aria-pressed");

          this.setAttribute("aria-pressed", isPressed === "true" ? "false" : "true");

          // Get all accordion buttons and handle their state based on toggle button state.

          accordionToggles.forEach(btn => {

            btn.setAttribute("aria-expanded", isPressed === "true" ? "false" : "true");

          });

        });

      }

      // Loop through each panel.

      accordionPanels.forEach(panel => {

        // Set up each disclosure.

        const currentPanel = panel.previousElementSibling;

        let panelID;

        if (currentPanel.classList.contains(accordionHeadingClassName)) {

          panelID = currentPanel.querySelector(accordionToggleClass).getAttribute("id");

        } else {

          panelID = currentPanel.getAttribute("id");

        }

        panel.setAttribute("id", `accordion-${panelID}`);

        // To better support scrolling and repositioned focus, the panels should have a proper role and accName.

        if (accordion.hasAttribute(accordionDataFixedHeight) || accordion.hasAttribute(accordionDataOverlay)) {

          panel.setAttribute("role", "region");
          panel.setAttribute("aria-labelledby", panelID);

        }

        // To better support inner-scrolling, the panels must be focusable.

        if (accordion.hasAttribute(accordionDataFixedHeight)) {

          panel.setAttribute("tabindex", "0");

        }

        // Add close button

        if (accordion.hasAttribute(accordionDataCloseButton)) {

          const closeButton = document.createElement("button");

          closeButton.setAttribute("aria-label", accordionCloseButtonLabel);
          closeButton.classList.add(accordionCloseClassName);

          closeButton.addEventListener("click", () => {

            const thisButton = panel.previousElementSibling;

            // Remove "data-active" attribute.

            accordion.removeAttribute(accordionDataActiveState);

            // Reset button state, move focus to button that initiated click.

            thisButton.setAttribute("aria-expanded", "false");
            thisButton.focus();

          });

          panel.prepend(closeButton);

        }

      });

    });

    // Check for duplicate IDs and log a warning

    const buttonIDs = Array.from(document.querySelectorAll(accordionToggleClass)).map(btn => btn.id);

    buttonIDs.forEach((id, index) => {

      if (buttonIDs.indexOf(id, index + 1) !== -1) {

        console.warn(`%c Warning: Duplicate Accordion ID found: #${id}. Accordions must have unique ID values.`, "background: #ff0000; color: #fff");

      }

    });

  };

  initAccordion();

  // BugHerd

  const bugHerdComponent = document.querySelector("bugherd-sidebar");
  const bugHerdPanel = shadowContainer.querySelector("#bugherd");

  if(!bugHerdComponent) {

    bugHerdPanel.remove();

  }

  // ** Alert Center **

  // MagicBullet

  const hasMagicBullet = document.querySelector("body.magicbullet-a11y");
  const magicMessage = shadowContainer.querySelector("#magicbullet-message");
      
  if (isCareerSite && !hasMagicBullet) {
    
    magicMessage.hidden = false;
    
  }

  // Language 

  const hasLang = document.documentElement.getAttribute("lang");
  const langMessage = shadowContainer.querySelector("#language-message");  

  if (!hasLang) {
    
    langMessage.hidden = false;
    
  }

  // Title

  const hasTitle = document.title;
  const titleMessage = shadowContainer.querySelector("#title-message"); 

  if (hasTitle == null || hasTitle == "") {
    
    titleMessage.hidden = false;
    
  }

  // Check for any errors

  const alertPanel = shadowContainer.querySelector("#accordion-alerts");

  // Get all visible .warning-info elements (i.e., not [hidden])

  const visibleWarnings = alertPanel.querySelectorAll(".a11y-pulse__info--warning:not([hidden])");

  if (visibleWarnings.length > 0) {

    const alertToggle = shadowContainer.querySelector("#alerts");
    const alertSpan = alertToggle.querySelector("span:not(.accordion__arrow)");
    const alertCount = document.createElement("span");
    
    alertCount.classList.add("accordion__count");
    alertCount.textContent =  visibleWarnings.length;
    alertSpan.append(alertCount);

  } else {

    alertPanel.innerHTML = "<p>Groovy! There are no alerts at this time.</p>";

  }

})();
