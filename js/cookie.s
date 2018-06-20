define('cookie', [],function () {

  return Cookie = {
    setRaw: function (n, v, daysToExp, pg) {
      var ex = '';

      if (daysToExp != undefined) {
        var d = new Date();
        d.setTime(d.getTime() + (86400000 * parseFloat(daysToExp)));
        ex = '; expires=' + d.toGMTString();
      }

      var cookieDomain = ".fifa.com";

      if (document.location.href.indexOf(".qa.fifa.com") != -1) {
        cookieDomain = ".qa.fifa.com"
      } else if (document.location.href.indexOf("localhost") != -1) {
        cookieDomain = "localhost";
      }

      if (pg != undefined) { if (pg != '.') ex += '; path=' + pg; }
      else { ex += '; path=/'; }
      if (cookieDomain !== undefined && cookieDomain != null && cookieDomain != '')
        ex += ";domain=" + cookieDomain;
      return (document.cookie = escape(n) + '=' + (v || '') + ex);
    },

    set: function (n, v, daysToExp, pg) {
      return this.setRaw(n, escape(v || ''), daysToExp, pg);
    },

    get: function (n) {
      var c = document.cookie.match(new RegExp('(^|;)\\s*' + escape(n) + '=([^;]*)'));
      return (c ? c[2] : null);
    },
    erase: function (n, pg) {
      var c = Cookie.get(n) || true;
      Cookie.set(n, '', -1, pg);
      return c;
    },
    accept: function () {
      if (typeof (navigator.cookieEnabled) == 'boolean') { return navigator.cookieEnabled; }
      Cookie.set('_t', '1'); return (Cookie.erase('_t') === '1');
    }
  };

  window.Cookie = Cookie;
});
