
/* utility */

define('utility', ['jquery', 'modernizr'], function ($) {

  return Utility = {

    scrollTop: function (offset) {
      offset = offset || 0;
      $("html, body").animate({ scrollTop: offset }, 300);
    },
    scrollTo: function (element, offset, delay) {
      if (element != undefined) {
        offset = offset || 60;
        delay = delay || 300;
        $("html, body").animate({ scrollTop: element.offset().top - offset }, delay);
        return true;
      } else
        return false;
    },
    breakpoint: {
      phone: '(max-width: 767px)',
      tablet: '(min-width: 768px) and (max-width: 1023px)',
      desktop: '(min-width: 1024px) and (max-width: 1999px)',
      desktop_lg: '(min-width: 1200px) and (max-width: 1439px)',
      desktop_xl: '(min-width: 1440px)'
    },
    isMobile: function () {
      return Modernizr.mq(Utility.breakpoint.phone);
    },
    isRTL: function () {
      return ($("html").attr("dir").toLowerCase() === "rtl");
    },
    isTablet: function () {
      return Modernizr.mq(Utility.breakpoint.tablet);
    },
    transitionEndEvent: function () {
      var el = document.createElement('div')

      var transEndEventNames = {
        WebkitTransition: 'webkitTransitionEnd',
        MozTransition: 'transitionend',
        OTransition: 'oTransitionEnd otransitionend',
        transition: 'transitionend'
      };

      for (var name in transEndEventNames) {
        if (el.style[name] !== undefined) {
          return transEndEventNames[name];
        }
      }

      return false;
    },

    sanitize: function (source) {
      return source ? source.toString().replace(new RegExp(/[\/<>]/gi), '').replace(new RegExp(/%3[CE]*[\/]*/gi), '') : '';
    },

    toQueryParams: function (source, separator) {

      var q = {};
      var match = Utility.sanitize(source.trim()).match(/([^?#]*)(#.*)?$/);
      if (match) {
        var qs = match[1].replace("+", " ").split(separator || "&");
        var i, qps, name, value;
        for (i = 0; i < qs.length; i++) {
          qps = qs[i].split("=", 2);
          name = unescape(qps[0]);
          // we consider also the case of multiple "=" in the value
          value = (qps.length == 1) ? undefined : qs[i].substring(name.length + 1);

          if (!q[name]) {
            q[name] = value;
          } else if (typeOf(q[name]) === "array") {
            q[name][q[name].length] = value;
          } else {
            q[name] = [q[name], value];
          }
        }
      }
      return q;


    },

    deleteCookie: function () {
      Cookie.erase('FIFACom');
      document.cookie = 'FIFACom=;path=/;domain=.fifa.com;expires=Thu, 01 Jan 1970 00:00:01 GMT';
    },

    getLang: function () {
      return $("html").attr("lang");
    },

    getLangCode: function () {
      return $("html").attr("lang").substring(0, 2);
    },

    log: function () {
      if (!window.console) { return; }
      Function.apply.call(console.log, console, arguments);
    },
    info: function () {
      if (!window.console) { return; }
      Function.apply.call(console.info, console, arguments);
    },
    warn: function () {
      if (!window.console) { return; }
      Function.apply.call(console.warn, console, arguments);
    },
    error: function () {
      if (!window.console) { return; }
      Function.apply.call(console.error, console, arguments);
    },
    splitResourceId: function (id, splitLen) {
      var ret = '';
      if (id) {
        id = id.toString();
        for (var i = 0; i < (id.length - id.length % splitLen) / splitLen; i++) {
          ret += id.substr(i * splitLen, splitLen) + '/';
        }
        if (i * splitLen < id.length) ret += id.substr(i * splitLen) + '/';
        ret = ret.slice(0, -1);
      }
      return ret;
    },
    getQueryStringParameters: function () {
      var vars = [], hash;
      var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
      }
      return vars;
    },
    getMetaData: function (name) {
        var metas = document.getElementsByTagName('meta');
        for (var i = 0; i < metas.length; i++) {
          if (metas[i].getAttribute("name") == name) {
            return metas[i].getAttribute("content");
          }
        }

        return "";
    },
    showDataAssets: function () {
      var assets = this.getQueryStringParameters()["showassets"];
      if (assets === 'true') {
        $('[data-campaign]').each(function () {
          var assetContainer = $(this).find('.asset-container');
          if (assetContainer.length == 0) {
            $(this).prepend('<div class="asset-container"></div>');
            assetContainer = $(this).find('.asset-container');
          }
          assetContainer.prepend('<span class="asset-info asset-info__campaign">data-campaign: ' + $(this).attr("data-campaign") + '</span>');
        });

        $('[data-asset]').each(function () {
          var assetContainer = $(this).find('.asset-container');
          if (assetContainer.length == 0) {
            $(this).prepend('<div class="asset-container"></div>');
            assetContainer = $(this).find('.asset-container');
          }
          assetContainer.prepend('<span class="asset-info">data-asset: ' + $(this).attr("data-asset") + '</span>');
        });
        //$('[data-sponsor]').each(function () {
        //  $(this).prepend('<span class="asset-info asset-info__sponsor">data-sponsor: ' + $(this).attr("data-sponsor") + '</span>');
        //});

      }
    },

    guid: function () {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },

    isElementInViewport : function (el) {
      var top = el.offsetTop >= 70 ? (el.offsetTop - 70) : 0,
      left = el.offsetLeft,
      width = el.offsetWidth,
      height = el.offsetHeight,
      p_YOffset = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset || 0,
      p_XOffset = document.body.scrollLeft || document.documentElement.scrollLeft || window.pageXOffset || 0,
      w_innerHeight = document.documentElement.clientHeight || window.innerHeight,
      w_innerWidth = document.documentElement.clientWidth || window.innerWidth;
      while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
      }
      return (
        top < (p_YOffset + w_innerHeight) &&
        left < (p_XOffset + w_innerWidth) &&
        (top + height) > p_YOffset &&
        (left + width) > p_XOffset
      );
    }

  };

  window.utility = Utility;
});
