/* 

  TalentBrew: Advanced Job Descriptons 1.1

  Michael "Spell" Spellacy (michael.spellacy[at]tmp.com)
  Joshua Mahoney (joshua.mahoney[at]tmp.com)
  Brock Barnett (brock.barnett[at]tmp.com)

*/

(function () {

  // Sticky Apply Header

  if ($('#advanced-job-details').length) {

    var $window = $(window);

    ajdBanner = $('#ajd-banner');
    ajdNavigation = $('.ajd-navigation');
    ajdBannerOffset = ajdBanner.offset().top;

    ajdFixedNavigation = function() {

      var ajdOuterHeight = ajdBanner.outerHeight();

      if ($(window).scrollTop() > ajdBannerOffset) {

        // Since the heading is now fixed, we must make up for the loss of the element in the document flow to keep content 
        // in same position. Probably a couple of ways to do this, but decided to add the height of the sticky navigation as margin-top
        // to body

        ajdBanner.addClass('ajd-fixed-heading');

        $('body').css('margin-top', ajdOuterHeight + 'px');

      } else {

        $('#ajd-banner').removeClass('ajd-fixed-heading');
        $('body').removeAttr('style');
        ajdNavigation.find("a").removeClass('active');

      }

      // Highlight Navigation on Scroll

      ajdNavigation.find('li').each(function() {

        if ($(window).scrollTop() > ($($(this).children().attr("href")).position().top - ajdOuterHeight)) {

          ajdNavigation.find("a").removeClass('active');
          $(this).children().addClass('active');

        }

      });

    };

    // Initiate Fixed Navigation

    $window.on('scroll resize', ajdFixedNavigation);
    $window.trigger('scroll');

    // Navigate to Section

    $('.ajd-navigation a').on('click', function(){

      var ajdOuterHeight = ajdBanner.outerHeight();

      $('html, body').animate({scrollTop: $($(this).attr('href')).position().top - (ajdOuterHeight - 1)}, 'slow');
      $($(this).attr('href')).attr("tabindex", "-1").focus();

      return false; 

    });

    $('.ajd-navigation a').on('focus', function(){

      $(this).parent().parent().find('a').removeClass('active');
      $(this).addClass('active');

    });

    // Return to Navigation

    $('.ajd-btn-nav a').on("click", function(){

      $($(this).attr('href')).children().focus();
      $(this).parent().parent().attr("tabindex", "0");

      return false;

    });

    // Animate Glassdoor Rating

    $('.ajd-glassdoor-rating i').css('width', $('.ajd-glassdoor-score').text());

  }

})();