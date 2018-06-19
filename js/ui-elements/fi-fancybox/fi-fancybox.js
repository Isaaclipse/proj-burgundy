/* fifa fancybox */

define('fi_fancybox', ['jquery', 'fancybox', 'dragdealer'], function ($) {

  var is_rtl = $('html').attr('dir') === 'rtl' ? true : false;

  return FiFancybox = {
    createPhotoList: function (css_class, options) {

      var photoList = $(css_class);

      $(function () {
        $.fancybox.defaults.buttons = [
          'slideShow',
          'close',
        ];
        $.fancybox.defaults.hash = false;
        $('[data-fancybox]', photoList).each(function () {
          caption = $(this).find(".fancy-gallery-overlay-caption").html();
          $(this).data("caption", caption);
        });
      });
    },
    createMediaMix: function (css_class, options) {

      FiFancybox.createPhotoList(css_class);

      var mediaList = $(css_class);


      var fms; //fixed media slider
      var step = window.innerWidth / $('.fi-fixed-media__slider', mediaList).width();
      window.addEventListener('load', function () {
        fms = new Dragdealer('media-gallery');

        $('.fi-fixed-media__btn--prev', mediaList).on('click',
            function () {
              fms.setValue(fms.getValue()[0] - step, 0);
            });
        $('.fi-fixed-media__btn--next', mediaList).on('click',
            function () {
              fms.setValue(fms.getValue()[0] + step, 0);
            });
      });

      //Aspect ratio lock for videos is not implemented yet, but this is a trick
      $(function () {
        $(options.selector).fancybox({
          afterLoad: function (instance, current) {
            current.$content.css({
              overflow: 'visible',
              background: '#000'
            });
          },
          autoPlay: 'true',
          onUpdate: function (instance, current) {
            var width, height, ratio = 16 / 9, video = current.$content, type = current.type;
            if (video && type && type === 'iframe') {
              video.hide();
              width = current.$slide.width();
              height = current.$slide.height() - 100;

              if (height * ratio > width) {
                height = width / ratio;
              } else {
                width = height * ratio;
              }

              video.css({
                width: width,
                height: height
              }).show();
            }
          }
        });
      });
    },
    createVideoList: function (css_class, options) {

      var videoList = $(css_class);

      $(options.selector).click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      });

      $(function () {
        $(options.selector).fancybox({
          afterLoad: function (instance, current) {
            current.$content.css({
              overflow: 'visible',
              background: '#000'
            });
          },
          autoPlay: 'true',
          onUpdate: function (instance, current) {
            var width, height, ratio = 16 / 9, video = current.$content;
            if (video) {
              video.hide();
              width = current.$slide.width();
              height = current.$slide.height() - 100;

              if (height * ratio > width) {
                height = width / ratio;
              } else {
                width = height * ratio;
              }

              video.css({
                width: width,
                height: height
              }).show();
            }
          }
        });
      });
    },

    initializeCaption: function () {
      $(document).on("click", ".fancy-gallery-overlay-caption__button--info", function (e) {
        $(this).parent().toggleClass("fancy-gallery-overlay-caption--show");
        e.preventDefault();
        e.stopPropagation();
      });
    }
  };
});






