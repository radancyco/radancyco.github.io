
// TalentBrew Accessibility Issues & Enhancements
// Developer(s): Michael "Spell" Spellacy, Twitter: spellacy, GitHub: michaelspellacy, michael.spellacy[at]tmp.com

(function(){

    // A11y Fixes

    // Issue: Validation Error (addLoadEvent)

    // Note: Asked Filip to remove.

    $("script[type='text/javascript']").removeAttr("type");

    // A11y: Remove "aria-expanded" from all adjacent elements of "expandable-parent"

    $(".expandable-parent").attr("aria-expanded", "false").next().removeAttr("aria-expanded");

    $(".expandable-parent").on("click", function() {

    	$(this).attr('aria-expanded', function (i, attr) {

    		return attr == 'true' ? 'false' : 'true'

    	});

    	$(this).next().removeAttr("aria-expanded");

    });

    // Address any image with a missing alt attribute (usually tracking pixels, etc.)

    $("img:not([alt])").attr("alt", "");

    // Job Map Page - Remove target. These links only send information to Google Map UI. Target not needed.

    $(".job-map-nearby a").removeAttr("target");

    // Social Share Module Links require "Open New Window" text for assistive tech

    $(".social-share-items a").append(" <span class='wai'>(Opens in New Windows)</span>");

    // Issue: Applied Filters section (Search Results) has inappropriate ARIA on it. Removing.

    $(document).ajaxStop(function() {

  		$("#applied-filters").removeAttr("aria-hidden aria-expanded");

	});

	setTimeout(function(){

		// A11y Form Fixes

		// Issue: Remove aria-required from p element (it should not exist on this element) and various other elements.

	    $(".data-form .form-field.required, .form-field.required input:not([type='checkbox']), .form-field.required select, .form-field.required textarea").removeAttr("aria-required");

	    // Required="required" is XHTML serialization and may throw a11y validation issues if not set to blank or true.

		$(".data-form input[required='required'], .data-form select[required='required'], .data-form textarea[required='required']").prop("required", true);

		// Checkboxes missing due to reset above, so let's add them back

		$("input[type='checkbox'][aria-required='true']").prop("required", true).removeAttr("aria-required");

	    // Issue: Remove "autocomplete" from select element.

	    $(".data-form select").removeAttr("autocomplete");

	    // Issue: Since input element is "valid", it requires no aria-describedy attribute, since there is no validation message to ever bind it to.

	    $(".valid").removeAttr("aria-describedby");

	    // Issue: Clutter, remove empty instruction-text spans

		$(".instruction-text").each(function() {

			if ($(this).is(":empty")){

  				$(this).remove();

			}

		});

	    // Issue: Clutter, remove unused elements from fields that are not required.

	    $(".form-field:not(.required").each(function() {

			$(this).find(".field-validation-valid").remove();

		});

		// Issue: Remove inline style on honeypot field and use hidden attribute instead

		$(".form-field.confirm-email").prop("hidden", true).removeAttr("aria-hidden style");

		// Issue: Remove aria-hidden from honeybot label and input. The parent element should hide this from all assistive tech.
		// Note: Not CSS dependent, so fields will always be hidden.

		$(".form-field.confirm-email label, .form-field.confirm-email input").removeAttr("aria-hidden");

		// Issue: Remove Role from field-validation-error (it's really not needed)

		$(".field-validation-valid").removeAttr("role");

		// Issue: We need to alert AT when submission is successful, so let's do that...

		// $(".form-field.form-message").attr("role", "alert");

	}, 1000);

  // Issue: Job DEscriptions have horrible inaccessible garbage in them. This is an attemtp to remove some of that garbage...

  // Remove tabindex

  $(".ats-description").find("[tabindex]:not([tabindex='0']):not([tabindex^='-'])").remove();

	// Future Enhancement

	// Issue: We need to perform some additional form validation/manipulation after form is submitted

	$(".data-form").on("submit", function() {

		console.log ("Something accessible has happened");

	});

})();
