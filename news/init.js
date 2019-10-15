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

    var tmpNewsMsg = "AIA acquires Carve – a UK based social media leader. <span class='learn-more'>Learn more.</span>";
    var tmpNewsLink = "https://www.prnewswire.co.uk/news-releases/aia-worldwide-acquires-uk-based-social-media-leader-carve-821667559.html";

  } else if (tmpNewsInstance === "canada-french") {

    var tmpNewsMsg = "TMP acquiert Maximum - une entreprise de technologie de marketing spécialisée dans le recrutement située aux Pays-Bas. <span class='learn-more'>Apprenez-en plus.</span>";
    var tmpNewsLink = "https://www.prnewswire.com/fr/communiques-de-presse/tmp-worldwide-etend-son-implantation-geographique-via-l-acquisition-de-maximum-societe-technologique-de-marketing-recrutement-basee-aux-pays-bas-859539444.html";

  } else if (tmpNewsInstance === "france") {

    var tmpNewsMsg = "TMP fait l’acquisition de Maximum - société technologique de Marketing Recrutement basée aux Pays-bas. <span class='learn-more'>En savoir plus.</span>";
    var tmpNewsLink = "https://www.prnewswire.com/fr/communiques-de-presse/tmp-worldwide-etend-son-implantation-geographique-via-l-acquisition-de-maximum-societe-technologique-de-marketing-recrutement-basee-aux-pays-bas-859539444.html";

  } else if (tmpNewsInstance === "germany") {

    tmpNewsMsg = "TMP Worldwide übernimmt den britischen Social Media-Marktführer Carve. <span class='learn-more'>Mehr erfahren.</span>";
    var tmpNewsLink = "https://www.finanzen.net/nachricht/aktien/tmp-worldwide-uebernimmt-den-britischen-social-media-marktfuehrer-carve-8101243";

  } else if (tmpNewsInstance === "brazil") {

    tmpNewsMsg = "TMP Worldwide adquire a Carve, líder de mídia social do Reino Unido. <span class='learn-more'>Saber mais.</span>";
    var tmpNewsLink = "https://www.infomoney.com.br/patrocinados/pr-newswire/tmp-worldwide-adquire-a-carve-lider-de-midia-social-do-reino-unido/";

  } else if (tmpNewsInstance === "brazil-latin-america") {

    tmpNewsMsg = "TMP adquiere Maximum: empresa de tecnología de marketing de reclutamiento con sede en Holanda. <span class='learn-more'>Saber mais.</span>";
    var tmpNewsLink = "https://blog.tmp.com/2019/10/03/think-globally-succeed-locally-what-tmp-worldwides-acquisition-of-netherlands-based-maximum-means-for-clients/";

  } else {

    var tmpNewsMsg = "TMP acquires Carve – a UK based social media leader. <span class='learn-more'>Learn more.</span>";
    var tmpNewsLink = "https://blog.tmp.com/2019/10/15/were-trending-on-social-tmp-worldwide-acquires-social-media-innovator-carve/";

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
