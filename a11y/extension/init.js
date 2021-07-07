/*!

  Radancy: Smoke Test Extension - Extension Functionality

  Contributor(s):
  Michael "Spell" Spellacy, Email: michael.spellacy@radancy.com, Twitter: @spellacy, GitHub: michaelspellacy

*/

document.addEventListener("DOMContentLoaded", () => {

  // New Tab Buttons and Links

  function openNewTab() {

    let newTab = document.querySelectorAll(".new-tab");

    if(newTab) {

      newTab.forEach(function(tab, e){

        tab.setAttribute("rel", "noopener");
        tab.setAttribute("target", "_blank");

        let srOnly = document.createElement("span");

        srOnly.classList.add("sr-only");
        srOnly.textContent = "(Opens in new tab)";
        tab.appendChild(srOnly);

      });

    }

  }

  // Tab Related Stuff

  chrome.tabs.query({

    active: true, lastFocusedWindow: true}, tabs => {

    document.body.classList.add("extension-active"); // Only add this class when extension active.

    let url = tabs[0].url; // URL of active tab

    let A11yLink = document.querySelectorAll(".validate-a11y");

    if(A11yLink){

      A11yLink.forEach(function(link, e){

        let A11yHref = link.href;
        link.setAttribute("href", A11yHref + "report#/" + url);

      });

    }

    let HTMLLink = document.querySelectorAll(".validate-html");

    if(HTMLLink){

      HTMLLink.forEach(function(link, e){

        let HTMLHref = link.href;
        link.setAttribute("href", HTMLHref + "nu/?showsource=yes&showoutline=yes&showimagereport=yes&doc=" + url);

      });

    }

    let CSSLink = document.querySelectorAll(".validate-css");

    if(CSSLink){

      CSSLink.forEach(function(link, e){

        let CSSHref = link.href;
        link.setAttribute("href", CSSHref + "validator?profile=css3&warning=0&uri=" + url);

      });

    }

    let PDFLink = document.querySelectorAll(".validate-pdf");

    if(PDFLink){

      PDFLink.forEach(function(link, e){

        let PDFHref = link.href;
        link.setAttribute("href", PDFHref + "?url=" + url);

      });

    }

    let HeadingOutlineLink = document.querySelectorAll(".validate-heading");

    if(HeadingOutlineLink){

      HeadingOutlineLink.forEach(function(link, e){

        const HeadingOutlineHref = link.href;
        link.setAttribute("href", HeadingOutlineHref + "?url=" + url);

      });

    }

    let ImageValidationLink = document.querySelectorAll(".validate-images");

    if(ImageValidationLink){

      ImageValidationLink.forEach(function(link, e){

        const ImageValidationHref = link.href;
        link.setAttribute("href", ImageValidationHref + "?url=" + url);

      });

    }

    function runBookmarklet(scriptName, scriptType) {

      chrome.tabs.executeScript({

        code: "var scriptName = " + JSON.stringify(scriptName)

      },

      function() {

        chrome.tabs.executeScript({

          file: "page.js"

        });

        chrome.tabs.insertCSS({

          file: "page.css"

        });

      }

    )};

    let a11yButtons = document.querySelectorAll("button[data-script]");

    if(a11yButtons) {

      // If current URL does not match stored URL, then clear all session keys.

      let currentURL = tabs[0].url;
      let storedURL = window.localStorage.getItem("extensionURL");

      if(currentURL !== storedURL) {

        window.localStorage.clear();
        window.localStorage.setItem("extensionURL", currentURL);

      }

      a11yButtons.forEach(function(button, e){

        button.setAttribute ("id", "btn-script-" + (e + 1));
        button.addEventListener("click", () => {

          let dataScript = button.getAttribute("data-script");

          runBookmarklet(dataScript);
          button.setAttribute("disabled", true);
          window.localStorage.setItem(button.id, dataScript);

        });

      });

    }

    // Let's loop through storage and append disabled to match we find...

    Object.keys(localStorage).forEach(function(key, i){

      var dataScriptID = localStorage.key(i);

      if(dataScriptID !== "extensionURL") {

        console.log(dataScriptID);

        document.getElementById(dataScriptID).setAttribute("disabled", true)

      }

    });

  });

  // Reset Tab

  function resetPage() {

    chrome.tabs.executeScript({

      code: "window.location.reload();"

    });

  }

  let resetButton = document.getElementById("btn-reset");

  if(resetButton) {

    resetButton.addEventListener("click", () => {

      resetPage();

      let a11yButtons = document.querySelectorAll("button[data-script]");

      a11yButtons.forEach(function(button, e){

        button.removeAttribute("disabled");

      });

      window.localStorage.clear();

    });

  }

  // Get Heading Outline

  let bodyID = document.body.id;

  alert(bodyID);

  let pageElement = document.getElementById("inner-content");

  if(pageElement) {

    let urlParam = new URLSearchParams(window.location.search);
    let pageTest = urlParam.get("url");

    let pageElementHref = "https://validator.w3.org/nu/?showoutline=yes&doc=" + pageTest;
    let pageError = "<p class='alert'>We're sorry, the content you are looking for can't be displayed right now. Try refreshing your page. If there is still an issue, you can <a href='" + pageElementHref + "'>access the page directly</a>.</p>";
    let request = new XMLHttpRequest();

    request.open("GET", pageElementHref, true);

    request.onload = function() {

      if (request.status >= 200 && request.status < 400) {

        // Success!

        let primaryHeading = document.getElementById("primary-heading");
        primaryHeading.innerHTML += ": <a class='new-tab' href=" + pageTest + ">" + pageTest + "</a>";

        openNewTab();

        let parser = new DOMParser();
        let response = parser.parseFromString(request.responseText, "text/html");
        let fragment = response.getElementById("headingoutline");

        pageElement.innerHTML = "";
        pageElement.appendChild(fragment);

      } else {

        // We reached our target server, but it returned an error

        pageElement.innerHTML = pageError;

      }

    };

    request.onerror = function() {

      // There was a connection error of some sort

      pageElement.innerHTML = pageError;

    };

    request.send();

  }

  openNewTab();

});
