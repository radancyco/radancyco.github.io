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

	var primaryNavigation = document.getElementById("main-navigation");

	// Make Mobile Button

	var primaryNavigationBtn = document.createElement("button");

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

	var navigationLink = document.querySelectorAll("#main-navigation a");

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
	var codeText = "Copy link to example";

	codeButton.forEach(function(code, e){

  		code.addEventListener("click", function () {

    		var codeURL = this.getAttribute("data-code");

    		navigator.clipboard.writeText(codeURL).then(function() {

      			code.innerText = "Link Copied!";

    		}, function() {

      			code.innerText = "Link not copied!!"
  
    		});

    		setTimeout(function(){

      			code.innerText = codeText;

    		}, 3000);

  		});

	});

})();

/*!

  Radancy Component Library: Jump Menu (In-Page, Custom)

  Contributor(s):
  Michael "Spell" Spellacy
  
  Dependencies: None

*/

(function() {

	// Display which Jump Menu in use via console:
	
	console.log('%c Jump Menu (In-page, Custom) v1.0 in use. ', 'background: #6e00ee; color: #fff');
	
	var inPageClass = ".in-page-custom";
	var inPageLabelClass = ".in-page-custom__label";
	var inPageSelectClass = ".in-page-custom__select";
	var inPageOptionClass = ".in-page-custom__select option";
	var inPageContentClass = ".in-page-custom__content";
	var inPage = document.querySelectorAll(inPageClass);
	var inPageLabel = document.querySelectorAll(inPageLabelClass);
	var inPageSelect = document.querySelectorAll(inPageSelectClass);
	var inPageState = "active";
	var inPageHash =  window.location.hash;
	var inPageFragment = inPageHash.substr(1);
	var inPageContentList = [];
	
	// On page load
	
	inPage.forEach(function(component, e){
	
	  // Check to see if "dynamic" Jump Menu in use.
	
	  if(component.hasAttribute("data-in-page-dynamic")){
	
		var inPageContent = component.querySelectorAll(inPageContentClass);
		var inPageContentNth = component.querySelectorAll(inPageContentClass + ":nth-of-type(n + 2)");
	
		inPageContentNth.forEach(function(content, i){
	
		  content.setAttribute("hidden", "");
	
		});
	
		inPageContent.forEach(function(content, i){
	
		  var count = (i + 1);
	
		  // If custom ID present
	
		  if(content.hasAttribute("data-in-page-id")) {
	
			var contentID = content.getAttribute("data-in-page-id");
	
		  } else { 
	
			var contentID = "content-" + count;
	
		  }
	
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
	
	inPageLabel.forEach(function(label, e){
	
	  // Apply "for" attribute to each label.
	
	  label.setAttribute("for", "in-page-select-" + (e + 1));
	
	});
	
	inPageSelect.forEach(function(select, e){
	
	  // Apply "id" to each select.
	
	  select.setAttribute("id", "in-page-select-" + (e + 1));
	
	});
	
	// Get all Job Menu options on page and push to array.
	
	inPageOption.forEach(function(option, e){
	
	  inPageContentList.push(option.getAttribute("value"));
	
	});
	
	// console.log(inPageContentList)
	
	function inPageSelectedState() {
	
	  // Check array against hash
	
	  if(inPageContentList.includes(inPageHash)) {
	
		// If hash matches one of the array selections, then load the selected content in hash
	
		var inPageSelected =  document.getElementById(inPageFragment);
		var inPageContent = inPageSelected.closest(inPageClass).querySelectorAll(inPageContentClass);
	
		inPageContent.forEach(function(content, i){
	
		  content.setAttribute("hidden", "");
	
		});
	
		inPageSelected.removeAttribute("hidden");
	
		inPageOption.forEach(function(select, i){
	
		  var optionvalue  = select.getAttribute("value");
	
		  if (location.hash === optionvalue) {
	
			select.setAttribute("selected", "");
			select.closest(inPageClass).classList.add(inPageState);
	
		  }
	
		});
	
	  }
	
	}
	
	inPageSelectedState();
	
	inPageSelect.forEach(function(select, e){
	
	  select.addEventListener("change", function () {
	
		var inPageParent = this.closest(inPageClass);
	
		var inPageSelected = inPageParent.getElementsByTagName("select")[0];
	
		if(!inPageParent.hasAttribute("data-in-page-aria-live")){
	
		  var inPageAnnounce = inPageParent.querySelector("div[aria-live]");
	
		  inPageAnnounce.textContent = "Selected Content: " + this.options[this.selectedIndex].text;
	
		}
	
		history.replaceState(null, null, inPageSelected.value);
	
		var inPageContentSelected = window.location.hash.substr(1);
	
		var inPageContent = inPageParent.querySelectorAll(inPageContentClass);
	
		inPageContent.forEach(function(content, i){
	
		  content.setAttribute("hidden", "");
	
		});
	
		document.getElementById(inPageContentSelected).removeAttribute("hidden");
	
		// Set selected jump menu to active.
	
		inPage.forEach(function(menu, e){
	
		  menu.classList.remove(inPageState);
	
		});
	
		inPageParent.classList.add(inPageState);
	
	  });
	
	});
	
	// Some browsers fail to place the select back to 0 when back button selected. This fixes that.
	
	window.addEventListener("beforeunload", function () {
	
	  inPage.forEach(function(menu, e){
	
		if (!menu.classList.contains(inPageState)) {
	
		  menu.getElementsByTagName("select")[0].selectedIndex = 0;
	
		}
	
	  });
	
	});
	
})();
