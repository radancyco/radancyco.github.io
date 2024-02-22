// Scraper

$(".link-list a").on( "click", function() {

	$(this).append(" - <b>Copied!</b>").contents().unwrap();

	var Path = $(this).attr("href");

	$("<div>").load($(this).attr("href") + " #content article >", function() {

      $("code").append("<p><strong>Page: " + Path + "</strong><p>");

      if($("button").hasClass("html-render")) {

      	$("code").append($(this).html($(this).html()));

      } else {

      	$("code").append($(this).html($(this).html().replace(new RegExp("<", "g"), '&lt;').replace(new RegExp(">", "g"), '&gt;').replace(/\n/g, "<br>")));
      }

	});

	return false;

});

$("#btn-html").on( "click", function() {

	$(this).toggleClass("html-render");

	var text = $(this).text();
	$(this).text(text == "Render HTML" ? "Render Code" : "Render HTML");

});

$(".btn-clear").on( "click", function() {

	$("code").empty();

});

$(".btn-reload").on( "click", function() {

	location.reload();

});
