
// Tab UI 1.0 (jQuery)
// Developer: Michael "Spell" Spellacy, Developer: Michael "Spell" Spellacy. Twitter: @spellacy, GitHub: michaelspellacy

(function () {

  var URLHash = window.location.hash;
  var $tabUI = $(".tab-ui");
  var $tabLink = $(".tab-link");
  var $tabPanel = $(".tab-panel");
  var tabHeading = ".tab-heading";
  var ariaMsgId = "current-selection";
  var ariaMsg = "Currently selected";

  // Hide All Tab Panels

  $tabPanel.attr("aria-hidden",  true);

  // Append hidden div with message for AT users when aria-describedy added to link

  $tabUI.append("<div id='" + ariaMsgId + "' hidden>" + ariaMsg + "</div>");

  // Add Unique ID's to each Tab List link

  $tabLink.each(function() {

    $(this).attr("id", $(this).attr("href").replace("#", "") + "-item");

  });

  // Now that our DOM is prepared, we need to address the initial state of the page when user first arrives.

  // First, check for the hash in the URL

  if(URLHash) {

    // Load selected Tab List link

    $(URLHash + '-item').attr("aria-describedby",  ariaMsgId);

    // Load selected Tab Panel Content

    $(URLHash).attr("aria-hidden",  false);

  } else {

    // Just load the first Tab List link and Tab Panel

    $tabLink.first().attr("aria-describedby",  ariaMsgId);

    $tabPanel.first().attr("aria-hidden",  false);

    // TODO: Need a method of checking for Hashes not related to Tab UI.

  }

  // Event Trigger

  $tabLink.on("click", function() {

    togglePanel($(this));

    return false;

  });

  // Toggle Panel Function

  function togglePanel(obj) {

    var $tabRefrence = obj.attr("href"); // Link Hash

    // Toggle "active" class on outermost element

    $tabUI.toggleClass("active");

    // Deactivate all Tab List Items

    $tabLink.removeAttr("aria-describedby");

    // Activate selected Tab List Item

    obj.attr("aria-describedby",  ariaMsgId);

    // Deactivate all Tab Panels

    $tabPanel.attr("aria-hidden",  true);

    // Future Enhancement: Pull in content from another page

    // Activate selected Tab Panel

    $($tabRefrence).attr("aria-hidden",  false);

    // Apply focus to first heading

    $($tabRefrence).children(tabHeading).attr("tabindex", -1).focus();

    // Change URL Hash

    history.pushState(null, null, $tabRefrence);

  }

})();
