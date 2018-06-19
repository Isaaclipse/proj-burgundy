require(['jquery', 'fi_fancybox'], function ($, FiFancybox) {

  $(document).ready(function () {

    FiFancybox.createPhotoList('.fi-module-latest-photos');

    FiFancybox.createVideoList('.fi-module-latest-videos', { selector: '[data-fancybox=latest-videos]' });

    FiFancybox.createVideoList('.fi-top-content', { selector: '.owl-item:not(.cloned) [data-fancybox=topcontent-videos]' });

    FiFancybox.createMediaMix('.fi-fixed-media', { selector: '[data-fancybox=media-fixed-mixed]' });

    FiFancybox.createMediaMix('.fi-photolist', { selector: '[data-fancybox=media-fixed-mixed]' });

    FiFancybox.createMediaMix('.fi-card-squared-list', { selector: '[data-fancybox=media-fixed-mixed]' });

    FiFancybox.createMediaMix('.fi-module-latest-news__carousel', { selector: '[data-fancybox=figure-videos]' });

    FiFancybox.createMediaMix('.fi-top-content', { selector: '[data-fancybox=topcontent-video]' });

    FiFancybox.initializeCaption();
  });
});
define("modules/fancybox", function(){});

