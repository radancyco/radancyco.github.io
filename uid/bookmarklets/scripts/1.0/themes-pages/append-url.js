// TMP Worldwide Bookmarklet: Append URL

// Dropping Jorge's sweet code in...

var pages = $('[data-page-type="content"]');
var pageCount = pages.length;

for (var i = 0; i <= pageCount; i++) {

	(function(i) {

		var url = $(pages[i]).find('a').attr('href');
		var vanity = "";

		$.ajax({

			url: url,
			type: 'GET',
			success: function(data) {

				vanity = $(data).find('#vanity-url').val();
				redirect = $(data).find('#RedirectUrl').val();
				domain = $(data).find('#vanity-url').prev().text();

				displayVanity(domain, vanity, redirect, i);

			}

		});

	})(i);

}

function displayVanity(clientDomain, vanityURL, redirectURL, i) {

	if (vanityURL == "") {

		$(pages[i]).children(":eq(1)").append('<p class=theme-url><a href=' + redirectURL + ' target=_blank>' + redirectURL + '</a>');

	} else {

		$(pages[i]).children(":eq(1)").append('<p class=theme-url><a href=https://' + clientDomain + vanityURL + ' target=_blank>' + 'https://' + clientDomain + vanityURL + '</a></p>');

	}

}