---
layout: null
---

(function(){

	document.getElementsByTagName("html")[0].className = "js";

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

	// Helper Functions

	function insertAfter(el, referenceNode) {

		referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);

	}

	function insertBefore(el, referenceNode) {

	    referenceNode.parentNode.insertBefore(el, referenceNode);

	}

	// Get Navigation

	// var primaryNavigation = document.getElementById("primary-navigation");

	// Make Mobile Button

	/* var menuButton = document.createElement("button");

	menuButton.setAttribute("id", "menu-button");
	menuButton.setAttribute("aria-expanded", "false");
	menuButton.textContent = "Menu";

	menuButton.onclick = function(){

		if(this.getAttribute("aria-expanded") === "true") {

			this.setAttribute("aria-expanded", "false");

		} else {

			this.setAttribute("aria-expanded", "true");

		}

	};

	insertBefore(menuButton, primaryNavigation); */

	// Highlight Navigation

	/* var documentID = document.body.id;

	if(document.getElementById("nav-" + documentID)) {

		document.getElementById("nav-" + documentID).getElementsByTagName("a")[0].classList.add("active");

	}

	if(document.body.classList.contains("news")) {

		document.getElementById("nav-news-index").getElementsByTagName("a")[0].classList.add("active");

	} */

	// Escape Key event(s) here

	/* document.onkeydown = function(e) {

		if (e.which === 27) {

	  		menuButton.setAttribute("aria-expanded", "false");

		}

	}; */

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

})();
