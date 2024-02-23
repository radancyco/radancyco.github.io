/*!

  Floating Labels Example

  Contributor(s):
  Michael "Spell" Spellacy

*/

// Example 3: Outer Float

var searchFormField = document.querySelectorAll(".outer-float-js input:not([type=submit]), .outer-float-js select");
var locationField = document.getElementsByClassName("search-location");

for (var i = 0; i < searchFormField.length; i++) {

  searchFormField[i].addEventListener("focus", function(){

    this.classList.add("has-focus");

  });

  searchFormField[i].addEventListener("blur", function(){

    this.classList.remove("has-focus");

    if (this.value !== "") {

       this.classList.add("has-text");

    } else {

      this.classList.remove("has-text");

    }

  });

}

for (var i = 0; i < locationField.length; i++) {

  locationField[i].addEventListener("blur", function(){

    if(this.value !== "") {

      this.parentNode.nextElementSibling.querySelector("select").classList.add("has-text")
      this.parentNode.nextElementSibling.querySelector("select").removeAttribute("disabled");

    } else {

      this.parentNode.nextElementSibling.querySelector("select").classList.remove("has-text");
      this.parentNode.nextElementSibling.querySelector("select").setAttribute("disabled", "");

    }

  });

}

function checkSearchFormFields() {

  for (var i = 0; i < searchFormField.length; i++) {

    if (searchFormField[i].value !== "") {

       searchFormField[i].classList.add("has-text");

    }

  }

}

checkSearchFormFields();
