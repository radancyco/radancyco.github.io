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

    var tmpNewsMsg = "TMP acquires Maximum – a Netherlands based recruitment marketing tech firm. <span class='learn-more'>Learn more.</span>";
    var tmpNewsLink = "https://www.prnewswire.co.uk/news-releases/aia-worldwide-grows-its-global-footprint-with-the-acquisition-of-maximum-a-netherlands-based-recruitment-marketing-tech-firm-860544745.html";

  } else if (tmpNewsInstance === "canada-french") {

    var tmpNewsMsg = "TMP acquiert Maximum - une entreprise de technologie de marketing spécialisée dans le recrutement située aux Pays-Bas. <span class='learn-more'>Apprenez-en plus.</span>";
    var tmpNewsLink = "https://www.prnewswire.com/fr/communiques-de-presse/tmp-worldwide-etend-son-implantation-geographique-via-l-acquisition-de-maximum-societe-technologique-de-marketing-recrutement-basee-aux-pays-bas-859539444.html";

  } else if (tmpNewsInstance === "france") {

    var tmpNewsMsg = "TMP fait l’acquisition de Maximum - société technologique de Marketing Recrutement basée aux Pays-bas. <span class='learn-more'>En savoir plus.</span>";
    var tmpNewsLink = "https://www.prnewswire.com/fr/communiques-de-presse/tmp-worldwide-etend-son-implantation-geographique-via-l-acquisition-de-maximum-societe-technologique-de-marketing-recrutement-basee-aux-pays-bas-859539444.html";

  } else if (tmpNewsInstance === "germany") {

    tmpNewsMsg = "TMP verändert die Welt der Talent Acquisition weiter und übernimmt Perengo. <span class='learn-more'>Mehr erfahren.</span>";
    var tmpNewsLink = "https://www.prnewswire.com/de/pressemitteilungen/tmp-worldwide-erweitert-global-prasenz-durch-akquise-von-maximum-einer-recruitment-marketing-tech-firma-825884443.html";

  } else if (tmpNewsInstance === "brazil") {

    tmpNewsMsg = "TMP adquire a Maximum - empresa de tecnologia de marketing de recrutamento sediada na Holanda. <span class='learn-more'>Saber mais.</span>";
    var tmpNewsLink = "https://www.prnewswire.com/news-releases/a-tmp-worldwide-aumenta-sua-presenca-global-com-a-aquisicao-da-maximum-empresa-de-tecnologia-de-marketing-de-recrutamento-sediada-na-holanda-843419823.html";

  } else if (tmpNewsInstance === "brazil-latin-america") {

    tmpNewsMsg = "TMP adquiere Maximum: empresa de tecnología de marketing de reclutamiento con sede en Holanda. <span class='learn-more'>Saber mais.</span>";
    var tmpNewsLink = "https://blog.tmp.com/2019/10/03/think-globally-succeed-locally-what-tmp-worldwides-acquisition-of-netherlands-based-maximum-means-for-clients/";

  } else {

    var tmpNewsMsg = "TMP acquires Maximum – a Netherlands based recruitment marketing tech firm. <span class='learn-more'>Learn more.</span>";
    var tmpNewsLink = "https://blog.tmp.com/2019/10/03/think-globally-succeed-locally-what-tmp-worldwides-acquisition-of-netherlands-based-maximum-means-for-clients/";

  }

  var tmpNewsAlert = document.createElement("a");

  tmpNewsAlert.setAttribute("id", "tmp-notice");
  tmpNewsAlert.setAttribute("href", tmpNewsLink);
  tmpNewsAlert.setAttribute("data-custom-event", "true");
  tmpNewsAlert.setAttribute("data-custom-category", "Custom Event");
  tmpNewsAlert.setAttribute("data-custom-label", "Maximum Acquisition");
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
