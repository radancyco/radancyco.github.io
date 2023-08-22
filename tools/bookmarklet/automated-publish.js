function submitPage() {

  // Remove all checkboxes we don't want checked in publishing.

  $('.select-all, #staged-sass, #staged-javascript').remove();

  if($('.publish-table :checkbox').length) {

    var n = $('.publish-table :checkbox').length;

    console.log('%c Publishing. There are ' + n + ' assets to go...', 'background: #6e00ee; color: #fff');

    $(".loadingoverlay_text").text("Publishing. Open console to see queue.");

    $('.publish-table :checkbox:lt(20)').prop('checked', true);
    $('.admin-ajax-submit').removeAttr('disabled').submit();

  } else {

    // Sass and JavaScript are sometimes not removed from the publishing queue, so we need to bypass them and remind user to publish manually.

    console.log('%c Finished publishing! Be sure to publish Sass and JavaScript manually. Have a nice day!', 'background: #009e60; color: #fff');

    // exit function

    return;

  }

}

submitPage();

$(document).ajaxStop(function(){

  setTimeout(function(){

    submitPage();

  },10000);

});
