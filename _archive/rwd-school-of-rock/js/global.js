
// Re-bind scrollspy and re-calculate menu offset depending on screen size

function addOffset() {

    if ($(window).width() < 800) {

        offsetValue = 0;

    } else {

        offsetValue = 100;

    }

    $('body').data().scrollspy.options.offset = offsetValue;

    // Force scrollspy to recalculate the offsets to your targets

    $('body').data().scrollspy.process();

}

function refreshScroll() {

    $('[data-spy="scroll"]').each(function () {

        var $spy = $(this).scrollspy('refresh');

    });

}

function resizeVideo() {

    var width = $('.video-iframe').parent('div').width();

    $('.video-iframe').css({

        'height': (width*.5625)+'px',
        'width':  width+'px'

    });

}

// Call twitter bootstrap scrollspy

$(document).ready(function() {

    $('#outline').scrollspy();

    refreshScroll();

    addOffset();

    resizeVideo();

    // Fade out other sections on hover - doing with JS and not css so that default is not transparent

    $('section').hover(function() {

        $('section').removeClass('transparent');

        $(this).addClass('opaque');

        $('section').not($(this)).addClass('transparent');

    }, function() {

        $('section').removeClass('transparent opaque');

    });

    // HACK: Prevent random menu disappearance in chrome

    $('nav a').click(function() {

        if ($(window).width() > 800) {

            setTimeout(function() { window.scrollTo(0,window.scrollY+1); }, 1);

        }

    });

});

$(window).resize( function() {

    addOffset();

    // Force scrollspy to recalculate the offsets to your targets

    $('body').data().scrollspy.process();

    refreshScroll();

    resizeVideo();

});
