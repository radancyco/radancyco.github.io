
// Append Bookmarklet

if (scriptName === "a11y-smoketest-grayscale" || scriptName === "a11y-smoketest-textspace" || scriptName === "a11y-smoketest-protanopia" || scriptName === "a11y-smoketest-protanomaly" || scriptName === "a11y-smoketest-deuteranopia" || scriptName === "a11y-smoketest-deuteranomaly" || scriptName === "a11y-smoketest-tritanopia" || scriptName === "a11y-smoketest-tritanomaly" || scriptName === "a11y-smoketest-achromatopsia" || scriptName === "a11y-smoketest-achromatomaly") {

  // Color Blindness

  // TODO, Only load one if loaded.

  var colorBlindnessFilter = document.getElementById("color-blindness-filter");

  if (!document.body.contains(colorBlindnessFilter)) {

    var svg = '<svg xmlns="http://www.w3.org/2000/svg" id="color-blindness-filter"><defs><filter id="protanopia"><feColorMatrix in="SourceGraphic" values="0.567, 0.433, 0, 0, 0 0.558, 0.442, 0, 0, 0 0, 0.242, 0.758, 0, 0 0, 0, 0, 1, 0"/></filter><filter id="protanomaly"><feColorMatrix in="SourceGraphic" values="0.817, 0.183, 0, 0, 0 0.333, 0.667, 0, 0, 0 0, 0.125, 0.875, 0, 0 0, 0, 0, 1, 0"/></filter><filter id="deuteranopia"><feColorMatrix in="SourceGraphic" values="0.625, 0.375, 0, 0, 0 0.7, 0.3, 0, 0, 0 0, 0.3, 0.7, 0, 0 0, 0, 0, 1, 0"/></filter><filter id="deuteranomaly"><feColorMatrix in="SourceGraphic" values="0.8, 0.2, 0, 0, 0 0.258, 0.742, 0, 0, 0 0, 0.142, 0.858, 0, 0 0, 0, 0, 1, 0"/></filter><filter id="tritanopia"><feColorMatrix in="SourceGraphic" values="0.95, 0.05, 0, 0, 0 0, 0.433, 0.567, 0, 0 0, 0.475, 0.525, 0, 0 0, 0, 0, 1, 0"/></filter><filter id="tritanomaly"><feColorMatrix in="SourceGraphic" values="0.967, 0.033, 0, 0, 0 0, 0.733, 0.267, 0, 0 0, 0.183, 0.817, 0, 0 0, 0, 0, 1, 0"/></filter><filter id="achromatopsia"><feColorMatrix in="SourceGraphic" values="0.299, 0.587, 0.114, 0, 0 0.299, 0.587, 0.114, 0, 0 0.299, 0.587, 0.114, 0, 0 0, 0, 0, 1, 0"/></filter><filter id="achromatomaly"><feColorMatrix in="SourceGraphic" values="0.618, 0.320, 0.062, 0, 0 0.163, 0.775, 0.062, 0, 0 0.163, 0.320, 0.516, 0, 0 0, 0, 0, 1, 0"/></filter></defs></svg>';

    document.body.insertAdjacentHTML("beforeend", svg );

  }

  document.body.classList.add(scriptName);

} else {

  document.body.appendChild(document.createElement("script")).src=scriptName;

  // TODO: Chrome Extension deoug panel throwing error about iframes. Remiving for now. 

  /* if(scriptName == "iframes") {

    var iframes=document.getElementsByTagName("iframe");

    for(i=0;i<iframes.length;i++) {

      iframes[i].contentDocument.body.appendChild(document.createElement("script")).src=scriptName;

    }

  } */

}
