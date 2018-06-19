
define('adv', ['jquery'], function ($) {

  var Adv = {
    loadAdv: function () {
        var advSizesMapping = {
            leaderboard: {
                desktop: [728, 90],
                tablet: [728, 90],
                mobile: [300, 50]
            },
            mrec: {
                desktop: [300, 250],
                tablet: [300, 250],
                mobile: [300, 50]
            },
            branded: {
                desktop: [970, 250],
                tablet: [728, 90],
                mobile: [300, 50]
            },
            halfpage: {
                desktop: [300, 600],
                tablet: [300, 250],
                mobile: [300, 250]
            },
            halfboard: {
                desktop: [300, 600],
                tablet: [728, 90],
                mobile: [300, 250]
            }
        };

      googletag.cmd.push(function () {
        var $dfpslots = $(".fi-adv-placeholder");
        if ($dfpslots.length) {
          $dfpslots.each(function () {
            var key = this.getAttribute('id');
            var advDefinition = (window.advList || {})[key];
            if (advDefinition) {
              var mapping_by_adsize = advSizesMapping[advDefinition.adSize];
              var mapping = googletag.sizeMapping().addSize([1024, 0], mapping_by_adsize.desktop).addSize([768, 0], mapping_by_adsize.tablet).addSize([320, 0], mapping_by_adsize.mobile).addSize([0, 0], []).build();
              var adSlot = googletag.defineSlot(advDefinition.adUnit, mapping_by_adsize.desktop, key);
              if (!adSlot) { return; }
              adSlot.defineSizeMapping(mapping)/*.setCollapseEmptyDiv(true)*/.addService(googletag.pubads());
              googletag.enableServices();
              googletag.display(key);
            }
          });
        }
      });
    },
    init: function () {
      //adv display
      window.googletag = window.googletag || {};
      googletag.cmd = window.googletag.cmd || [];
      (function () {
        var gscript = document.getElementById('google_adv_include');
        if (gscript) { return; }
        var gads = document.createElement('script');
        gads.id = 'google_adv_include';
        gads.async = true;
        gads.type = 'text/javascript';
        var useSSL = 'https:' == document.location.protocol; gads.src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';
        var node = document.getElementsByTagName('script')[0];
        node.parentNode.insertBefore(gads, node);
      })();

      Adv.loadAdv();

      $(window).on('resize.adv orientationchange.adv', throttle(function () {
        googletag.pubads().refresh(null, { changeCorrelator: false });
      }));
    }
  };

  $(document).ready(function () {
    Adv.init();
    window.Adv = Adv;
  });

  return Adv;
});

