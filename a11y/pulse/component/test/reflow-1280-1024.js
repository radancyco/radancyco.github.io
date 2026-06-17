javascript: (function () {

    const newWindow = window.open(document.location, "", "width=1280,height=1024");

    // Ensure the new window has loaded before applying styles

    /* 

        There is an issue with setting zoom in Firefox. Page scales differenty than when zooming in with keyboard.
    
        if (newWindow) {
  
        newWindow.onload = function () {
        
          newWindow.document.documentElement.style.zoom = "400%";
  
        };

    } */

})();

