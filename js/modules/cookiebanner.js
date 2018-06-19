
define('cookiebanner', ['jquery'], function ($) {

  var CookieBanner = {
    init: function () {
      var $body = $('body'),
          $cookieBanner = $('.fi-cookie-banner');
      if ($cookieBanner.length > 0) {
        var _cookie = getCookie('cookie-notification-gdpr');
        if (_cookie === '1') {
          setCookie('cookie-notification-gdpr', '1', 30);
        } else {
          $body.addClass('fi-cookie-banner-open');
        }
        $cookieBanner.find('button').on('click', function () {
          setCookie('cookie-notification-gdpr', '1', 30);
          $body.removeClass('fi-cookie-banner-open');
        });
      }
    }
  };

  $(document).ready(function () {
    CookieBanner.init();
  });

  return CookieBanner;
});

