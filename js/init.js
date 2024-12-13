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

	// Code Copier
	// Note: I probably have dupes of this. Condense into a single function.

	var btnCopyCode = document.querySelectorAll(".btn-code-copy");

	btnCopyCode.forEach(function(code){

		code.addEventListener("click", function () {

			var codeID = this.getAttribute("data-content-id");
			var codeContainer = document.getElementById(codeID);
			var codeCopy = codeContainer.textContent;

			navigator.clipboard.writeText(codeCopy).then(function() {

				code.classList.add("code-copied");

			}, function() {

				code.classList.add("code-not-copied");

			});

			setTimeout(function(){

				code.classList.remove("code-copied");
				code.classList.remove("code-not-copied");

			}, 3000);

		});

	});

})();