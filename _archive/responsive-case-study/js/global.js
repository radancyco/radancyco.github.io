function addMobileMenu() {
	$('nav').hide();
	if (!$('#menuButton').length) {
		var button = $('<a id="menuButton">menu</a>');
		$('header').append(button);
		
		$('#menuButton').click(function() {
			if ($('nav').css('display') == 'none') {
				$('nav').slideDown(200, function() {
					$('#menuButton').html('hide');
				});
			}
			else {
				$('nav').slideUp(200, function() {
					$('#menuButton').html('menu');
				});
			}
		});
	}
}

function removeMobileMenu() {
	if ($('#menuButton').length) {
		$('#menuButton').remove();
	}
	$('nav').show();
}

$(document).ready( function() {
	$('#outline').scrollspy();
	
	if ($(window).width() < 600) {
		addMobileMenu();
	}
});

$(window).resize( function() {
	if ($(window).width() < 600) {
		addMobileMenu();
	}
	else {
		removeMobileMenu();
	}
	$('[data-spy="scroll"]').each(function () {
		var $spy = $(this).scrollspy('refresh')
    });
});

//smooth scrolling from Devin Sturgeon
$('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
        || location.hostname == this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
           if (target.length) {
             $('html,body').animate({
                 scrollTop: target.offset().top
            }, 750);
            return false;
        }
    }
});


//sections fade as you scroll past - optional, commented out for now
/*$(window).scroll( function() {
    var currentY = $(document).scrollTop();
    
    $('section').each( function() {
        var yPos = $(this).offset().top;
        var height = $(this).height();
        var delta = yPos/currentY;
        
        if (yPos < currentY && yPos+height > currentY) {
            var opac = 1;
        }
        else if (delta >= 1) {
            if (2 - delta > 0) var opac = 2 - delta;
            else var opac = 0;
        }
        else if (delta < 1) {
            if (1 - delta > 0) var opac = 1-delta;
            else var opac = 0;
        }
        $(this).animate({ opacity: opac }, 0);
    });
});*/