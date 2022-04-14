function submitPage() {

  $('.select-all, #staged-sass, #staged-javascript').remove();

  if($('.publish-table :checkbox').length) {

    console.log('%c Publishing Pages. Be sure to publish Sass and JS manually.', 'background: #6e00ee; color: #fff');

    $('.publish-table :checkbox:lt(10)').prop('checked', true);
    $('.admin-ajax-submit').removeAttr('disabled').submit();

  } else {

    console.log('%c All done!', 'background: #009e60; color: #fff');

  }

}

submitPage();

$(document).ajaxStop(function(){

  setTimeout(function(){

    submitPage();

  },10000);

});
