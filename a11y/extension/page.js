
// Append Bookmarklet

if (scriptName === "a11y-smoketest-grayscale" || scriptName === "a11y-smoketest-textspace") {

document.body.classList.add(scriptName);

} else {

  document.body.appendChild(document.createElement("script")).src=scriptName;

  /* if(scriptName == "iframes") {

    var iframes=document.getElementsByTagName("iframe");

    for(i=0;i<iframes.length;i++) {

      iframes[i].contentDocument.body.appendChild(document.createElement("script")).src=scriptName;

    }

  } */

}
