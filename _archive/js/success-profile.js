/* 

  TalentBrew: Success Profile

  Michael "Spell" Spellacy (michael.spellacy[at]tmp.com)
  Joshua Mahoney (joshua.mahoney[at]tmp.com)
  Brock Barnett (brock.barnett[at]tmp.com)

*/

(function () {

  enhanceSuccessProfile = function() {
    
      $('.success-profile-primary-traits li').append('<div class="success-profile-level"/>').each(function(){

          var skillPercent = $(this).find('.success-profile-percent');
          var skillPercentValue = skillPercent.text() * 10;

          // console.log(skillPercentValue);

          skillPercent.css('min-width', 100 - skillPercentValue + '%');

          if(skillPercentValue != 100) {

              var skillLevel = skillPercentValue + '%';

          } else {

              var skillLevel = '98.5%';

          }

          $(this).find('.success-profile-level').css('max-width', skillLevel);

      });

  }

  enhanceSuccessProfile();

})();