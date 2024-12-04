---
layout: null
---

(function(){

	document.getElementsByTagName("html")[0].className = "js";

	var bodyId = document.getElementsByTagName("body")[0].id;

	var sectionName = document.getElementsByTagName("body")[0].getAttribute("class");

	var mainContent = document.getElementById("content");

	if (sectionName !== "video-hero-banner" || sectionName !== "component-library-animation-toggle") {

		// PWA Register

		if ("serviceWorker" in navigator) {

			window.addEventListener('load', function() {

				//Register the ServiceWorker

				navigator.serviceWorker.register("/service-worker.js", {

					scope: "./"

				});

			});

		}

	}

	// Get Navigation

	var primaryNavigation = document.querySelector(".main-navigation");

	// Make Mobile Button

	var primaryNavigationBtn = document.createElement("button");

	primaryNavigationBtn.classList.add("main-navigation__button")
	primaryNavigationBtn.setAttribute("aria-expanded", "false");
	primaryNavigationBtn.setAttribute("aria-label", "Menu");

	primaryNavigationBtn.addEventListener("click", function () {

	  if(this.getAttribute("aria-expanded") === "true") {

	    this.setAttribute("aria-expanded", "false");

	  } else {

	    this.setAttribute("aria-expanded", "true");

	  }

	});

	if(primaryNavigation) {

		primaryNavigation.prepend(primaryNavigationBtn);

	}

	// Highlight Navigation

	var navigationLink = document.querySelectorAll(".main-navigation a");

	navigationLink.forEach(function(link, e){

		var navigationId = link.getAttribute("data-nav-id");

		if(navigationId === bodyId) {

			link.setAttribute("aria-current", "page");

			if (link.hasAttribute("data-nav-anchor")) {

				link.setAttribute("href", location.hash);

			} else {

				link.setAttribute("href", "#content");

			}

		}

	});

	// Escape Key event(s) here

	document.addEventListener("keydown", function (e) {

		if (e.which === 27) {

	  		primaryNavigationBtn.setAttribute("aria-expanded", "false");

		}

	});

	// Add share button

	// <button id="share-button"><i class="fas fa-share"></i> Share this content</button> <!-- TODO: Script this in -->

	var shareButtonElm = document.createElement("button");
	shareButtonElm.classList.add("app-only");
	shareButtonElm.id = "share-button";
	shareButtonElm.textContent = "Share";

	mainContent.appendChild(shareButtonElm);

	var shareButton = document.getElementById("share-button");

	shareButton.addEventListener("click", async () => {

		try {

			await navigator.share({ title: document.title.replace(" - {{ site.company-name }}", ""), url: document.URL });

			console.log("Data was shared successfully");

		} catch (err) {

			console.error("Share failed:", err.message);

		}

	});

	// In-page Functionality

	// Get Offset

	function getOffset(el) {

		var rect = el.getBoundingClientRect();
		return {

			left: rect.left + window.scrollX,
			top: rect.top + window.scrollY

		};

	};

	// Scroll Button
	// Note: This is a temporary fix until we can update the buttons to use data-disclosure-enable-url 

	if(bodyId === "rad-baseline-index"){

		var disclosureButton = document.querySelectorAll(".disclosure--btn");

		disclosureButton.forEach(function(button, e){

			button.addEventListener("click", function () {

				history.pushState(null, null, "#" + this.id);

			});

		});

	}

	// URL Copier (Component Library)

	var codeButton = document.querySelectorAll("button[data-code]");

	codeButton.forEach(function(code, e){

  		code.addEventListener("click", function () {

    		var codeURL = this.getAttribute("data-code");

    		navigator.clipboard.writeText(codeURL).then(function() {

				code.classList.add("link-copied");

    		}, function() {

				code.classList.add("link-not-copied");
  
    		});

    		setTimeout(function(){

				code.classList.remove("link-copied");
				code.classList.remove("link-not-copied");

    		}, 3000);

  		});

	});

	// View Code Toggle

	var viewCodeBtnClass = ".btn-view-code";
	var viewCodeContentClass = ".content-view-code";

	var viewCodeBtn = document.querySelectorAll(viewCodeBtnClass);
	var viewCodeContent = document.querySelectorAll(viewCodeContentClass);

	if (viewCodeBtn.length) {

		viewCodeContent.forEach(function(content){

			content.setAttribute("hidden", "");

		});

		viewCodeBtn.forEach(function(btn){

			btn.setAttribute("aria-expanded", "false");

			btn.addEventListener("click", function () {
	
				if(this.getAttribute("aria-expanded") === "true") {
		
					this.setAttribute("aria-expanded", "false");
					this.parentElement.parentElement.parentElement.nextElementSibling.setAttribute("hidden", "");
		
				} else {
		
					this.setAttribute("aria-expanded", "true");
					this.parentElement.parentElement.parentElement.nextElementSibling.removeAttribute("hidden");
		
				}
		
			});

		});

	}

})();

/*!

  Radancy Component Library: Jump Menu (In-Page, Custom)

  Contributor(s):
  Michael "Spell" Spellacy
  
  Dependencies: None

*/

(function() {

	"use strict";

	// Display which component is in use via console:

	console.log("%c Select Navigation (Internal, Custom) v1.4 in use. ", "background: #6e00ee; color: #fff");

	var inPageClass = ".in-page-custom";
	var inPageLabelClass = ".in-page-custom__label";
	var inPageSelectClass = ".in-page-custom__select";
	var inPageOptionClass = ".in-page-custom__select option";
	var inPageContentClass = ".in-page-custom__content";
	var inPage = document.querySelectorAll(inPageClass);
	var inPageLabel = document.querySelectorAll(inPageLabelClass);
	var inPageSelect = document.querySelectorAll(inPageSelectClass);
	var inPageState = "active";
	var inPageContentList = [];

	// On page load

	inPage.forEach(function(component) {

		// Check if "dynamic" Jump Menu is in use.

		if (component.hasAttribute("data-in-page-dynamic")) {

		var inPageContent = component.querySelectorAll(inPageContentClass);
		var inPageContentNth = component.querySelectorAll(inPageContentClass + ":nth-of-type(n + 2)");

		inPageContentNth.forEach(function(content) {

			content.setAttribute("hidden", "");

		});

		inPageContent.forEach(function(content, i) {

			var count = i + 1;

			// If custom ID present

			var contentID = content.hasAttribute("data-in-page-id") ? content.getAttribute("data-in-page-id"): "content-" + count;

			content.setAttribute("id", contentID);

			// Create option element

			var option = document.createElement("option");

			option.setAttribute("value", "#" + contentID);
			option.textContent = content.getAttribute("data-in-page-name");

			var thisSelect = content.closest(inPageClass).getElementsByTagName("select")[0];

			// Append each dynamic option.

			thisSelect.appendChild(option);

		});

		}

	});

	var inPageOption = document.querySelectorAll(inPageOptionClass);

	inPageLabel.forEach(function(label, e) {

		// Apply "for" attribute to each label.

		label.setAttribute("for", "in-page-select-" + (e + 1));

	});

	inPageSelect.forEach(function(select, e) {

		// Apply "id" to each select.

		select.setAttribute("id", "in-page-select-" + (e + 1));

	});

	// Get all Job Menu options on page and push to array.

	inPageOption.forEach(function(option) {

		inPageContentList.push(option.getAttribute("value"));

	});

	function inPageSelectedState() {

		var inPageHash = window.location.hash || inPageContentList[0];
		var inPageFragment = inPageHash.slice(1);

		// Check array against hash

		if (inPageContentList.includes(inPageHash)) {

		// If hash matches one of the array selections, load the selected content in hash
		
		var inPageSelected = document.getElementById(inPageFragment);
		var inPageContent = inPageSelected.closest(inPageClass).querySelectorAll(inPageContentClass);

		inPageContent.forEach(function(content) {
		
			content.setAttribute("hidden", "");

		});

		inPageSelected.removeAttribute("hidden");

		inPageOption.forEach(function(option) {

			var optionValue = option.getAttribute("value");

			if (location.hash === optionValue) {

			option.setAttribute("selected", "");
			option.closest(inPageClass).classList.add(inPageState);

			} else {

			option.removeAttribute("selected");

			}

		});

		// Update select dropdown

		var select = document.querySelector(inPageClass + " select");

		if (select) {

			select.value = inPageHash;

		}

		}

	}

	inPageSelectedState();

	// Hash change event listener

	window.addEventListener("hashchange", function() {

		inPageSelectedState();

		// When link is pressed, place programatic focus on selected content. This is useful if links are elsewhere on the page.
		// If this causes issues elsewhere on page when haschange is fired, let me know.

		var selectedContent = document.querySelector(inPageContentClass + ":not([hidden])");

		selectedContent.setAttribute("tabindex", "-1");
		selectedContent.focus();

	});

	inPageSelect.forEach(function(select) {

		select.addEventListener("change", function() {

		var inPageParent = this.closest(inPageClass);
		var inPageContent = inPageParent.querySelectorAll(inPageContentClass);

		// Send message to screen reader.

		if(!inPageParent.hasAttribute("data-in-page-aria-live")){

			var inPageAnnounce = inPageParent.querySelector("div[aria-live]");

			inPageAnnounce.textContent = "Selected Content: " + this.options[this.selectedIndex].text; // TODO: Tokenize for i18n.

		}

		// Update hash in URL

		history.replaceState(null, null, this.value);

		inPageContent.forEach(function(content) {

			content.setAttribute("hidden", "");

		});

		var inPageContentSelected = window.location.hash.substr(1);

		document.getElementById(inPageContentSelected).removeAttribute("hidden");

		// Set selected jump menu to active.

		inPage.forEach(function(menu) {

			menu.classList.remove(inPageState);

		});

		inPageParent.classList.add(inPageState);

		});

	});

	// Fix for some browsers not resetting the select index on page unload.

	window.addEventListener("beforeunload", function() {

		inPage.forEach(function(menu) {

		if (!menu.classList.contains(inPageState)) {

			menu.getElementsByTagName("select")[0].selectedIndex = 0;

		}

		});

	});

})();