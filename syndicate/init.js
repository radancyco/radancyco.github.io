
(function() {

  var pagePath = document.getElementById("tmp-syndicate-link").href;

  fetch("https://cors-anywhere.herokuapp.com/" + pagePath).then(function(response) {

    console.log(response);

    return response.text();

  }).then(function(body) {

    document.querySelector("#tmp-syndicate").innerHTML = body;

  }).catch(function(error) {

      console.log('Looks like there was a problem: \n', error);

  });

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

    <a id="tmp-syndicate-link" href="https://tmpworldwide.github.io/support/"><noscript>View TMP Support</noscript></a>

</div>

<script src="https://tmpworldwide.github.io/syndicate/init.js"></script>

*/