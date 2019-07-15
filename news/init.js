/*

  TMP News
  Developer: Michael "Spell" Spellacy, Email: michael.spellacy@tmp.com, Twitter: @spellacy, GitHub: michaelspellacy

*/




(function() {

  // Get hostname so that we can select between QA and Production scripts.

  var hostName = location.hostname;

  hostName = hostName.substring(hostName.indexOf(".") + 1);

  var testPaths = hostName === "runmytests.com";

  if(testPaths) {

    // Add CSS

    var tmpNewsCSS = document.createElement("link");

    tmpNewsCSS.setAttribute("id", "tmp-news-css");
    tmpNewsCSS.setAttribute("rel", "stylesheet");
    tmpNewsCSS.setAttribute("href", "https://tmpworldwide.dev/news/init.css");

    // sass --watch init.scss:init.css --style compressed

    // Append CSS to DOM.

    document.head.appendChild(tmpNewsCSS);

    // Set Useful Variables

    var tmpNewsScript = document.getElementById("tmp-news");
    var tmpNewsBody = document.body;
    var tmpPageWrapper = document.getElementById("page");

    // Grab Data Attribute

    var tmpNewsInstance = tmpNewsScript.getAttribute("data-instance");

    // Create News Alert

    if(tmpNewsInstance === "aia") {

      tmpNewsMsg = "AIA Test";

    } else if (tmpNewsInstance === "canada-french") {

      tmpNewsMsg = "Canada (French) Test";

    } else if (tmpNewsInstance === "germany") {

      tmpNewsMsg = "Germany Test";

    } else if (tmpNewsInstance === "brazil") {

      tmpNewsMsg = "Brazil Test";

    } else {

      var tmpNewsMsg = "Test"

    }

    setTimeout(function(){

    var tmpNewsAlert = document.createElement("a");

    tmpNewsAlert.setAttribute("id", "tmp-notice");
    tmpNewsAlert.setAttribute("href", "#");
    tmpNewsAlert.innerHTML = tmpNewsMsg;

    tmpNewsBody.insertBefore(tmpNewsAlert, tmpNewsBody.firstChild);

    var noticeHeight = tmpNewsAlert.offsetHeight;

    tmpPageWrapper.style.cssText = "top: -" + noticeHeight + "px";

    setTimeout(function(){

      tmpNewsBody.classList.add("tmp-notice-active");

    }, 625);

  }, 625);

}

})();
