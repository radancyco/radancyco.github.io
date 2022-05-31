---
layout: null
---

(function(){

	document.getElementsByTagName("html")[0].className = "js";

	var bodyId = document.getElementsByTagName("body")[0].id;

	var sectionName = document.getElementsByTagName("body")[0].getAttribute("class");

	var mainContent = document.getElementById("content");

	if (sectionName !== "video-hero-banner") {

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

	var primaryNavigation = document.getElementById("primary-navigation");

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

	if(document.getElementById(primaryNavigation)) {

		primaryNavigation.prepend(primaryNavigationBtn);

	}

	// Highlight Navigation

	var documentID = document.body.id.replace("rad-", "").replace("-index", "");

	if(document.getElementById("nav-" + documentID)) {

		var selectedNav = document.getElementById("nav-" + documentID);

		selectedNav.setAttribute("aria-current", "page");
		selectedNav.setAttribute("href", "#content");

	}

	// Escape Key event(s) here

	document.addEventListener("keydown", function () {

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

	if(bodyId === "rad-baseline-index"){

		var disclosureButton = document.querySelectorAll(".disclosure--btn");

		disclosureButton.forEach(function(button, e){

			button.addEventListener("click", function () {

				window.scrollTo({

					top: getOffset(this).top

				});

				window.location = "#" + this.id;

			});

		});

	}

})();
