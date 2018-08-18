fetch("https://tmpworldwide.github.io/support/").then(function(response) {

  return response.text();

}).then(function(body) {

  document.querySelector('#tmp-syndicate').innerHTML = body;

});
