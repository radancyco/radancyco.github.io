javascript: (function () {

  var removeNg = true;
  var filterStrings = [

    "tag seen",
    "Stray end tag",
    "Bad start tag",
    "violates nesting",
    "Duplicate ID",
    "first occurrence of ID",
    "Unclosed element",
    "not allowed as child of",
    "unclosed elements",
    "not allowed on element",
    "unquoted attribute value",
    "Duplicate attribute",
    "tabindex must not",

  ];

  var filterRE, root, results, result, resultText, i, cnt = 0;

  filterRE = filterStrings.join("|");
  root = document.getElementById("results");

  if (!root) {

    alert("No results container found.");

    return;

  }

  results = root.getElementsByTagName("li");

  for (i = 0; i < results.length; i++) {

    result = results[i];

    if (result.className !== "") {

      resultText = (result.innerText !== undefined ? result.innerText : result.textContent) + "";

      if (resultText.match(filterRE) === null) {

        result.style.display = "none";
        result.className = result.className + " steveNoLike";
        cnt++;

      } else if (removeNg == true) {

        if (resultText.indexOf("not allowed on element") !== -1 && resultText.indexOf("ng-") !== -1 && resultText.indexOf("ng-") < resultText.indexOf("not allowed on element")) {

          result.style.display = "none";
          result.className = result.className + " steveNoLike";
          cnt++;

        }

      }

    }

  }

  alert("Complete. " + cnt + " items removed.");

})();
