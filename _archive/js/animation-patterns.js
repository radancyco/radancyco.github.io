/* 

  TMP Worldwide: Animation Patterns

  Drew Toth (drew.toth[at]tmpgovernment.giv)
  Michael "Spell" Spellacy (michael.spellacy[at]tmp.com)

*/

(function () {

	// Create Animation Code button and container

	$(".animation-container").append("<button class='btn-code' type='button'>View Code</button><div class='animation-code' tabindex='0'><pre><code class='slideLeft'/></pre></div>");

	$(".btn-code").on( "click", function() {

		$(".animation-code").toggleClass("active");

	});

	// Setup code for first animation

	// Note: To change the code, simply change the class on #object in HTML

	var selectedAnimation = $("#object").attr("class")

	$(".animation-code pre code").load($("#" + selectedAnimation).attr("href"));

	$("#" + selectedAnimation).addClass("active");

	// Grab Sass from button link and insert into code window (.animation-code)

	$(".button").on( "click", function() {

  		$("#object").removeClass().addClass($(this).attr("id"));
  		$(".animation-code pre code").load($(this).attr("href"));
  		$(".container").find(".button").removeClass("active");
  		$(this).addClass("active");
  
  		return false;

	});

	// There may be some conditions where we want to manipulate our canvas for better viewing.

	var canvas = $(".animation-canvas").offset().top;
	var $window = $(window);

	function checkTopPosition() {

		if ($window.scrollTop() >= canvas ) {

			$("body").addClass("active");

		} else {

			$("body").removeClass("active");

		}

  	}

  	$window.on('scroll resize', checkTopPosition);
  	$window.trigger('scroll');

})();
