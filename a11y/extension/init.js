// Accessibility Checklist

document.addEventListener("DOMContentLoaded", () => {

  chrome.tabs.query({

    active: true, lastFocusedWindow: true}, tabs => {

    document.body.classList.add("extension-active");

    let url = tabs[0].url;

    const A11yLink = document.getElementById("validate-a11y");

    if(A11yLink){

      const A11yHref = "https://wave.webaim.org/report#/";
      A11yLink.setAttribute("href", A11yHref + url)

    }

    const HTMLLink = document.getElementById("validate-html");

    if(HTMLLink){

      const HTMLHref = "https://validator.w3.org/nu/?showsource=yes&showoutline=yes&showimagereport=yes&doc=";
      HTMLLink.setAttribute("href", HTMLHref + url);

    }

    const CSSLink = document.getElementById("validate-css");

    if(CSSLink){

      const CSSHref = "https://jigsaw.w3.org/css-validator/validator?profile=css3&warning=0&uri=";
      CSSLink.setAttribute("href", CSSHref + url);

    }

    const PDFLink = document.getElementById("validate-pdf");

    if(PDFLink){

      const PDFHref = "http://checkers.eiii.eu/en/pdfcheck/?url=";
      PDFLink.setAttribute("href", PDFHref + url);

    }

    const HeadingOutlineLink = document.getElementById("view-heading-outline");

    if(HeadingOutlineLink){

      const HeadingOutlineHref = "outline.html?url=";
      HeadingOutlineLink.setAttribute("href", HeadingOutlineHref + url);

    }

  });

  function runBookmarklet(scriptName) {

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

    a11yButtons.forEach(function(button, j){

      button.addEventListener("click", () => {

        let dataScript = button.getAttribute("data-script");

        runBookmarklet(dataScript);
        button.setAttribute("disabled", true);

      });

    });

  }

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

      a11yButtons.forEach(function(button, j){

        button.removeAttribute("disabled");

      });

    });

  }

  // Get Page Outline

  var pageElement = document.getElementById("inner-content");

  if(pageElement) {

    var urlParam = new URLSearchParams(window.location.search);
    var pageTest = urlParam.get("url");

    var pageElementHref = "https://validator.w3.org/nu/?showoutline=yes&doc=" + pageTest;
    var pageError = "<p class='alert'>We're sorry, the content you are looking for can't be displayed right now. Try refreshing your page. If there is still an issue, you can <a href='" + pageElementHref + "'>access the page directly</a>.</p>";
    var request = new XMLHttpRequest();

    request.open("GET", pageElementHref, true);

    request.onload = function() {

      if (request.status >= 200 && request.status < 400) {

        // Success!

        var parser = new DOMParser();
        var response = parser.parseFromString(request.responseText, "text/html");
        var fragment = response.getElementById("headingoutline");

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

});
