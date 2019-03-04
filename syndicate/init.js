
(function() {

  var pageElement = document.getElementById("tmp-syndicate");
  var pageElementHref = pageElement.children[0];
  var pageError = "<p>We're sorry, the content you are looking for can't be displayed right now. However, you can <a href='" + pageElementHref + "'>access it directly</a>.</p>";
  var request = new XMLHttpRequest();

  request.open('GET', pageElementHref, true);

  request.onload = function() {

    if (request.status >= 200 && request.status < 400) {

      // Success!

      var response = request.responseText;

      pageElement.innerHTML = response;

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

})();

// Example Usage

/* @model PublishedContentModel

@{
    ViewBag.Title = Model.PageTitle;
    ViewBag.MetaDescription = Model.PageDescription;
    ViewBag.BodyId = "support";
    ViewBag.PrimaryHeading = ViewBag.Title;
    ViewBag.TertiaryLayout = "true";
}

<div id="tmp-syndicate">

    <a href="https://tmpworldwide.dev/support/"><noscript>View TMP Support</noscript></a>

</div>

<script src="https://tmpworldwide.github.io/syndicate/init.js"></script>

*/
