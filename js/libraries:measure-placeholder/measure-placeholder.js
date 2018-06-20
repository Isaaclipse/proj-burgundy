
define('placeholder', ['jquery'], function () {

  function displaySize() {
    var $box = $(".measure-placeholder");
    var _width = Math.round($box.width());
    var _height = Math.round($box.height());
    $box.find(".size").html(["(", _width, " x ", _height, ")"].join(''));
  }

  $(document).ready(function () {

    displaySize();

    $(window).on('resize.placholder orientationchange.placeholder', throttle(function () {
      displaySize();
    }));

  });

});

