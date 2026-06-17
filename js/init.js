---
layout: null
---

(function(){

	// Debounce

	function debounce(mainFunction, delay) {

		var timer;

		return function () {

			var args = arguments;
			
			clearTimeout(timer);

			timer = setTimeout(function () {

				mainFunction.apply(null, args);

			}, delay);

		};

	}

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

	var primaryNavigation = document.querySelector(".primary-header__navigation");

	// Make Mobile Button

	var primaryNavigationBtn = document.createElement("button");

	primaryNavigationBtn.classList.add("primary-header__navigation__button")
	primaryNavigationBtn.setAttribute("aria-expanded", "false");
	primaryNavigationBtn.setAttribute("aria-label", "Menu");
	primaryNavigationBtn.setAttribute("aria-controls", "primary-navigation");

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

	var navigationLink = document.querySelectorAll(".primary-header__navigation a");

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

		if (e.which === "Escape") {

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

		code.setAttribute("aria-pressed", "false");

  		code.addEventListener("click", function () {

    		var codeURL = this.getAttribute("data-code");

    		navigator.clipboard.writeText(codeURL).then(function() {

				code.classList.add("link-copied");
				code.setAttribute("aria-pressed", "true");

    		}, function() {

				code.classList.add("link-not-copied");
  
    		});

    		setTimeout(function(){

				code.classList.remove("link-copied");
				code.classList.remove("link-not-copied");
				code.setAttribute("aria-pressed", "false");

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

	const figureHighlight = document.querySelectorAll("figure.highlight");

	figureHighlight.forEach(function(highlight) {

		const btnCopyCode = document.createElement("button");

		btnCopyCode.classList.add("btn-code-copy");
		btnCopyCode.setAttribute("aria-pressed", "false");
		btnCopyCode.setAttribute("aria-label", "Copy Code");

		const iconParser = new DOMParser();
		const iconDoc = iconParser.parseFromString(`<span class='icon icon-check' aria-hidden='true'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'><path d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z'/></svg></span><span class='icon icon-copy-url' aria-hidden='true'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'><path d='M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z'/></svg></span>`, "text/html");

		Array.from(iconDoc.body.childNodes).forEach(function(node) {
			
			btnCopyCode.appendChild(document.adoptNode(node));
		
		});

		btnCopyCode.addEventListener("click", function() {

			const parent = this.parentElement;
			const clone = parent.cloneNode(true);
			const cloneBtn = clone.querySelector(".btn-code-copy");
			
			cloneBtn.remove();

			const codeCopy = clone.textContent;

			navigator.clipboard.writeText(codeCopy).then(function() {

				btnCopyCode.classList.add("code-copied");
				btnCopyCode.setAttribute("aria-pressed", "true");

			}, function() {

				btnCopyCode.classList.add("code-not-copied");

			});

			setTimeout(function() {

				btnCopyCode.classList.remove("code-copied");
				btnCopyCode.classList.remove("code-not-copied");
				btnCopyCode.setAttribute("aria-pressed", "false");

			}, 3000);

		});

		highlight.prepend(btnCopyCode);

	});

})();