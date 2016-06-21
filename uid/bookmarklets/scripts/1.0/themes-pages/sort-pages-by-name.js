// TMP Worldwide Bookmarklet: Sort Pages by Name

alert('URL appending is its own function now! Please visit https://tmpworldwide.github.io/uid/bookmarklets/ and bookmark it!');

$('#page-list tbody').each(function(index) {

	$(this).find('tr').sort(function (a, b) {

		var tda = $(a).find('td:eq(0)').text();

		var tdb = $(b).find('td:eq(0)').text();

		return tda > tdb ? 1: tda < tdb ? -1: 0;

	}).appendTo($(this));

	$(this).find('td:first-child a').attr('target', '_blank');

});
