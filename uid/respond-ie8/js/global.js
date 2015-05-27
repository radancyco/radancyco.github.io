	$('body').append('<a href="#" id="reset" class="intro">Respond II.</a>');
	$('#reset').click(function() {
		$('.flexslider').flexslider(1);
		$('.flexslider').flexslider(0);
		return false;
	});
	var slider;
	$('.flexslider').flexslider({
		animation: 'slide',
		animationLoop: false,
		controlNav: false,
		selector: '.slides > section',
		slideshow: false,
		start: function() {
			slider = $('.flexslider').data('flexslider');
		},
		before: function() {
			if ($(slider.slides[slider.animatingTo]).hasClass('intro')) {
				$('#reset').addClass('intro');
			}
			else {
				$('#reset').removeClass('intro');
			}
		}
	});