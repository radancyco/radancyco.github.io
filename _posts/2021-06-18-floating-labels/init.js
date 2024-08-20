/*!

  Floating Labels Example: Outer Float (JS)

  Contributor(s):
  Michael "Spell" Spellacy

*/

var searchFormField = document.querySelectorAll(".outer-float-js input:not([type=submit]), .outer-float-js select");
var locationField = document.querySelectorAll(".search-location");

searchFormField.forEach(function(field){

  field.addEventListener("focus", function(){

    field.classList.add("has-focus");

  });

  field.addEventListener("blur", function(){

    field.classList.remove("has-focus");

    if (field.value !== "") {

       field.classList.add("has-text");

    } else {

      field.classList.remove("has-text");

    }

  });

});

locationField.forEach(function(field){

  field.addEventListener("blur", function(){

    var radiusField = field.parentNode.nextElementSibling.querySelector("select");

    if(field.value !== "") {

      radiusField.classList.add("has-text")
      radiusField.removeAttribute("disabled");

    } else {

      radiusField.classList.remove("has-text");
      radiusField.setAttribute("disabled", "");

    }

  });

});

function checkSearchFormFields() {

  locationField.forEach(function(field){

    var radiusField = field.parentNode.nextElementSibling.querySelector("select");

    if (field.value !== "") {

      field.classList.add("has-text");

      radiusField.classList.add("has-text");
      radiusField.removeAttribute("disabled");

    }

  });

}

checkSearchFormFields();