
/* 

  TalentBrew: Global Functionality

  Michael "Spell" Spellacy (michael.spellacy[at]tmp.com, @mspellac)

*/

(function () {

  // Begin: Check Scroll Position

  // Note: To use, just add "enhance-element" class to any element you wish to make interactive

  var $animateElement = $('.enhance-element');
  var $stateName = 'active';
  var $window = $(window);

  function checkScrollPosition() {

    var windowHeight = $window.height();
    var windowTopPosition = $window.scrollTop();
    var windowBottomPosition = (windowTopPosition + windowHeight);

    $.each($animateElement, function() {

      var $element = $(this);
      var elementHeight = $element.outerHeight();
      var elementTopPosition = $element.offset().top;
      var elementBottomPosition = (elementTopPosition + elementHeight);

      // Check to see if current container within viewport

      if ((elementBottomPosition >= windowTopPosition) && (elementTopPosition <= windowBottomPosition)) {

        $element.addClass($stateName);

      } else {

        $element.removeClass($stateName);

      }

    });

  }

  $window.on('scroll resize', checkScrollPosition);

  $window.trigger('scroll');

  // End: Check Scroll Position

})();
