// Main Javscript file for the TMP UI Standards Guide

$(document).ready(function(){

	// Let's genearte the TOC, instead. Easier to maintain and still perfectibly accessible

	var ToC = "<nav role='navigation' id='table-of-contents'><h3>Table of Contents</h3><ul>";

	var newLine, el, title, link;

	$("#our-standards h2, #code-review h2").each(function() {

		el = $(this);
		title = el.text();
		link = "#" + el.attr("id");

		newLine = "<li><a href='" + link + "'>" + title + "</a></li>";

		ToC += newLine;

	});

	ToC += "</ul></nav>";

	$("#our-standards, #code-review").prepend(ToC);

	// Back to top

	$(".back-to-toc").on("click", function(){

		if (location.pathname.replace(/^\//,"") == this.pathname.replace(/^\//,"") && location.hostname == this.hostname) {

			var target = $(this.hash);

			target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");

			if (target.length) {

				$("html,body").animate({scrollTop: target.offset().top}, 1000);

				return false;
			}

		}

	});

});
