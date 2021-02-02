
// Tab UI 2.0 (jQuery)
// Developer: Michael "Spell" Spellacy, Developer: Michael "Spell" Spellacy. Twitter: @spellacy, GitHub: michaelspellacy

(function () {

  var URLHash = window.location.hash;
  var $tabUI = $(".tab-ui");
  var $tabLink = $(".tab-link");
  var $tabPanel = $(".tab-panel");
  var tabHeading = ".tab-heading";
  var ariaMsgId = "current-selection";
  var ariaMsg = "Currently selected";

  // Hide all Tab Panels

  $tabPanel.attr("aria-hidden",  true);

  // Append hidden message to DOM. This message will be used by AT users when aria-describedy is added to link

  $tabUI.append("<div id='" + ariaMsgId + "' hidden>" + ariaMsg + "</div>");

  // Add Unique ID and data attr to each Tab List link

  $tabLink.each(function(index) {

    $(this).attr({

      "id": "tab-" + (index + 1) + "-link",
      "data-id": "tab-" + (index + 1)

    });

  });

  // We need to create a toggle button for each panel. This will only be available to mobile users.
  // Let's create an array to hold all of our Tab Link text values.
  // Our button text must always match our Tab Link text from our HTML

  var btnText = [];

  $tabLink.each(function() {

    btnText.push($(this).text()); // Title 1, Title 2, etc.

  });

  // Append button before each panel.

  $tabPanel.each(function(index) {

    $(this).before("<button id='tab-" + (index + 1) +  "-button' data-id='tab-" + (index + 1) + "' class='tab-button' aria-controls='" + $(this).attr("id") + "' aria-expanded='false'>" + btnText[index] + "</button>");

  });

  // The button is created, assign to variable for reuse.

  var $tabButton = $(".tab-button");

  // Now that our DOM is prepared, we need to address the initial state of the page when user first arrives.

  // First, check for the hash in the URL

  if(URLHash) {

    // If hash matches any ID's on our page, do the following...

    // Append aria-describedby to correct link.

    $(URLHash + '-link').attr("aria-describedby",  ariaMsgId);

    // Append aria-selected to correct button.

    $(URLHash + '-button').attr("aria-expanded", true);

    // Load selected Tab Panel content.

    $(URLHash).attr("aria-hidden",  false);

  } else {

    // Just load the first Tab List link, Tab Button and Tab Panel

    $tabLink.first().attr("aria-describedby",  ariaMsgId);

    $tabButton.first().attr("aria-expanded",  true);

    $tabPanel.first().attr("aria-hidden",  false);

    // TODO: Need a method of checking for Hashes not related to Tab UI.

  }

  // Event Trigger

  $tabLink.add($tabButton).on("click", function() {

    togglePanel($(this));

    return false;

  });

  // Toggle Panel Function

  function togglePanel(obj) {

    // ID to reuse throughout function

    var $tabRefrence = "#" + obj.data("id"); // Link Hash

    // Deactivate all Tab Button Items

    $tabButton.attr("aria-expanded", false);

    // Activate selected Tab List Item

    $($tabRefrence + "-button").attr("aria-expanded", true);

    // Do same for links

    // Deactivate all Tab List links

    $tabLink.removeAttr("aria-describedby");

    // Activate selected Tab List links

    $($tabRefrence + "-link").attr("aria-describedby",  ariaMsgId);

    // Deactivate all Tab Panels

    $tabPanel.attr("aria-hidden",  true);

    // Activate selected Tab Panel and apply focus to first heading.

    $($tabRefrence).attr("aria-hidden",  false).children(tabHeading).attr("tabindex", -1).focus();

    // Change URL Hash

    history.pushState(null, null, $tabRefrence);

  }

})();
