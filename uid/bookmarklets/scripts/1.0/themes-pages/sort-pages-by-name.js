$('#page-list tbody').each(function(index) {

	$(this).find('tr').sort(function (a, b) {

		var tda = $(a).find('td:eq(0)').text();

		var tdb = $(b).find('td:eq(0)').text();

		return tda > tdb ? 1: tda < tdb ? -1: 0;

	}).appendTo($(this));

	$(this).find('td:first-child a').attr('target', '_blank');

	$(this).find('[data-page-type=content] td:first-child a').each(function() {

		var localURL = $.get($(this).attr('href'), function(data) {

				data.find($('#vanity-url').text())

		});

			$(this).parent().parent().find('td:nth-child(2)').append($('<p>' + localURL + '</p>'));

	});

});