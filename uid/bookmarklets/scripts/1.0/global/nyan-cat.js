
if(!$('body').hasClass("nyan")) {

	n();

}

if(!$('#css-bookmarklet').length) {

	$('head').append('<link rel="stylesheet" id="css-bookmarklet" href="https://tmpworldwide.github.io/uid/bookmarklets/scripts/1.0/bookmarklets.css"/>');

}

if(!$('.btn-close-nyan').length) {

	$('body').append('<button type="submit" class="btn-close-nyan">Shoo, Nyan Cat!</button>');
	$('.page-wrap').wrap('<marquee/>');

}

$('.btn-close-nyan').on('click', function() {

  $('body').removeClass('nyan');
  $('#nyan').remove();
  $(this).remove();
  $('.page-wrap').unwrap();
  location.reload();

});