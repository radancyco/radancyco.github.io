
// TMP Worldwide Bookmarklet: Nyan Cat
// Developer: Michael "Spell" Spellacy, Developer: Michael "Spell" Spellacy. Twitter: @spellacy, GitHub: michaelspellacy

if(!$('body').hasClass("nyan")) {

	n(); // Thanks, Plum :-)

}

if(!$('#css-bookmarklet').length) {

	$('head').append('<link rel="stylesheet" id="css-bookmarklet" href="https://tmpworldwide.github.io/uid/bookmarklets/scripts/1.0/bookmarklets.css"/>');

}

if(!$('.btn-close-nyan').length) {

	$('body').append('<button type="submit" class="btn-close-nyan">Shoo, Nyan Cat!</button>');

}

$('.btn-close-nyan').on('click', function() {

  $('body').removeClass('nyan');
  $('#nyan').remove();
  $(this).remove();

  alert("hello");

});