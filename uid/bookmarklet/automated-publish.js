function submitPage() {

  $('.select-all, #staged-sass, #staged-javascript').remove();

  if($('.publish-table :checkbox').length) {

    var n = $('.publish-table :checkbox').length;

    console.log('%c Publishing. There are ' + n + ' pages to go.', 'background: #6e00ee; color: #fff');

    $('.publish-table :checkbox:lt(10)').prop('checked', true);
    $('.admin-ajax-submit').removeAttr('disabled').submit();

  } else {

    console.log('%c Finished publishing! Be sure to publish Sass and JavaScript manually.', 'background: #009e60; color: #fff');

    return;

  }

}

submitPage();

$(document).ajaxStop(function(){

  setTimeout(function(){

    submitPage();

  },10000);

});
