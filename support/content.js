var pagePath = document.getElementById("tmp-syndicate-link").href;

fetch(pagePath).then(function(response) {

  return response.text();

}).then(function(body) {

  document.querySelector('#tmp-syndicate').innerHTML = body;

});
