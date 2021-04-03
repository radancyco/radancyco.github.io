// Accessibility Checklist

document.addEventListener("DOMContentLoaded", () => {

  chrome.tabs.query({

    active: true, lastFocusedWindow: true}, tabs => {

    let url = tabs[0].url;

    var A11yLink = document.getElementById("wave-validation");
    var A11yHref = "https://wave.webaim.org/report#/";
    A11yLink.setAttribute("href", A11yHref + url)

    var HTMLLink = document.getElementById("html-validation");
    var HTMLHref = "https://validator.w3.org/nu/?doc=";
    HTMLLink.setAttribute("href", HTMLHref + url);

    var CSSLink = document.getElementById("css-validation");
    var CSSHref = "https://jigsaw.w3.org/css-validator/validator?profile=css3&warning=0&uri=";
    CSSLink.setAttribute("href", CSSHref + url);

    var PDFLink = document.getElementById("pdf-validation");
    var PDFHref = "http://checkers.eiii.eu/en/pdfcheck/?url=";
    PDFLink.setAttribute("href", PDFHref + url);

  });

  function exampleFunction(scriptName) {

    chrome.tabs.executeScript({

      code: "var scriptName = " + JSON.stringify(scriptName) },

      function() {

        chrome.tabs.executeScript({ file: "page.js" }); // this is key
        // chrome.tabs.insertCSS({ file: "page.css" });

      }

    )

  }

  var a11yButtons = document.querySelectorAll("button[data-script]");

  a11yButtons.forEach(function(button, j){

    button.addEventListener("click", (e) => {

      let dataScript = button.getAttribute("data-script");

      exampleFunction(dataScript);

    });

  });

});
