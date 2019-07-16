/*

  TMP News
  Developer: Michael "Spell" Spellacy, Email: michael.spellacy@tmp.com, Twitter: @spellacy, GitHub: michaelspellacy

*/

(function() {

  // Add CSS

  var tmpNewsCSS = document.createElement("link");

  tmpNewsCSS.setAttribute("id", "tmp-news-css");
  tmpNewsCSS.setAttribute("rel", "stylesheet");
  tmpNewsCSS.setAttribute("href", "https://tmpworldwide.dev/news/init.css");

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

    var tmpNewsMsg = "AIA continues to transform the recruitment landscape with the acquisition of Perengo."
    var tmpNewsLink = "#";

  // var tmpNewsMsg = "AIA continues to transform the recruitment landscape with the acquisition of Perengo. <span class='learn-more'>Learn More</span>";
  // var tmpNewsLink = "https://www.aia.co.uk/programmatic-jobs-media-buying/";

  } else if (tmpNewsInstance === "canada-french") {

    var tmpNewsMsg = "TMP poursuit la transformation de l’écosystème recrutement avec l’acquisition de Perengo. <span class='learn-more'>En savoir plus.</span>";

  } else if (tmpNewsInstance === "france") {

    var tmpNewsMsg = "TMP poursuit la transformation de l’écosystème recrutement avec l’acquisition de Perengo. <span class='learn-more'>En savoir plus.</span>";

  } else if (tmpNewsInstance === "germany") {

    tmpNewsMsg = "TMP verändert mit der Akquisition von Perengo die Personalbeschaffungslandschaft weiter. <span class='learn-more'>Mehr erfahren</span>";

  } else if (tmpNewsInstance === "brazil") {

    tmpNewsMsg = "A TMP continua a transformar o cenário de recrutamento com a aquisição da Perengo. <span class='learn-more'>Saber mais.</span>";

  } else if (tmpNewsInstance === "brazil-latin-america") {

    tmpNewsMsg = "A TMP continua a transformar o cenário de recrutamento com a aquisição da Perengo. <span class='learn-more'>Saber mais.</span>";

  } else {

    var tmpNewsMsg = "TMP continues to transform the recruitment landscape with the acquisition of Perengo. <span class='learn-more'>Learn More</span>"
    var tmpNewsLink = "https://www.tmp.com/programmatic-jobs-media-buying/";

  }

  var tmpNewsAlert = document.createElement("a");

  tmpNewsAlert.setAttribute("id", "tmp-notice");
  tmpNewsAlert.setAttribute("href", tmpNewsLink);
  tmpNewsAlert.setAttribute("data-custom-event", "true");
  tmpNewsAlert.setAttribute("data-custom-category", "Custom Event");
  tmpNewsAlert.setAttribute("data-custom-label", "Perengo Acquisition");
  tmpNewsAlert.innerHTML = tmpNewsMsg;

  setTimeout(function(){

    tmpNewsBody.insertBefore(tmpNewsAlert, tmpNewsBody.firstChild);

    var noticeHeight = tmpNewsAlert.offsetHeight;

    tmpPageWrapper.style.cssText = "top: -" + noticeHeight + "px";

    setTimeout(function(){

      tmpNewsBody.classList.add("tmp-notice-active");

    }, 625);

  }, 625);

})();
