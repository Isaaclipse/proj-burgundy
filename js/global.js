
// picture fill on error utility
function setDefaultPicture(obj, format_desktop, format_tablet, format_mobile) {
  var pictureTag = obj.parentElement;
  var elements = pictureTag.getElementsByTagName('source');
  require(['utility'], function (Utility) {
    //while (elements[0]) elements[0].parentNode.removeChild(elements[0])
    var img_formats = [format_desktop, format_tablet, format_mobile];
    var figure = pictureTag.parentElement.parentElement;

    if (figure.nodeName.toLowerCase() == 'figure') {
      figure.className += ' fi-placeholder-fallback';
    }
    var formats_length = img_formats.length;
    for (var i = 0; i < formats_length; i++) {
      var elm = elements[i];
      if (!elm) { continue; }
      elm.setAttribute('srcset', getUrlPlaceholder(img_formats[i]));
    }
    if (Utility.isMobile()) {
      obj.src = getUrlPlaceholder(format_mobile);
    }
    else if (Utility.isTablet()) {
      obj.src = getUrlPlaceholder(format_tablet);
    }
    else {
      obj.src = getUrlPlaceholder(format_desktop);
    }
    obj.onerror = null;
  });
}


function setDefaultPictureClass(obj) {
  var pictureTag = obj.parentElement;
  var figure = pictureTag.parentElement.parentElement;

  if (figure.nodeName.toLowerCase() == 'figure') {
    figure.className += ' fi-placeholder-fallback';
  }
}


function getUrlPlaceholder(format) {
  var url = '/assets/img/backgrounds/placeholder_lnd_flat.png';

  if (format != null && format.length > 2) {
    switch (format.substr(0, 3).toLowerCase()) {
      case 't_l':
      default:
        url = '/assets/img/backgrounds/placeholder_lnd_flat.png';
        break;
      case 't_s':
        url = '/assets/img/backgrounds/placeholder_sqr_flat.png';
        break;
      case 't_p':
        url = '/assets/img/backgrounds/placeholder_prt_flat.png';
        break;
      case 't_t':
        url = '/assets/img/backgrounds/placeholder_tc_flat.png';
        break;
    }
  }
  return url;
}

function isFromExternalUrl() {
  var prevHost = document.referrer.split("/")[2];
  if (prevHost != undefined && prevHost.length > 1) {
    prevHost = prevHost[2];
    return location.hostname == prevHost;
  }
  return false;
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date(),
    exdays = exdays || 30;
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

function getCookie(cname) {
  var name = cname + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last,
      deferTimer;

  return function () {
    var context = scope || this,
        now = +new Date,
        args = arguments;

    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

// Twitter automatic embed  
function tweetAutoEmbed() {
  var _tweets = document.querySelectorAll('.twitter-tweet');
  if (_tweets.length) {
    window.twttr = (function (d, s, id) {
      var t;
      if (!d.getElementById(id)) {
        if (!d.querySelectorAll('script[src*="platform.twitter.com/widgets.js"]').length) {
          var js, fjs = d.getElementsByTagName(s)[0];
          js = d.createElement(s);
          js.id = id;
          js.src = "https://platform.twitter.com/widgets.js";
          fjs.parentNode.insertBefore(js, fjs);
        }
      }
      return window.twttr || (t = { _e: [], ready: function (f) { t._e.push(f) } });
    }(document, "script", "twitter-wjs"));
    window.twttr.ready(function (twttr) {
      twttr.widgets.load();
    });
  }
};
if (document.addEventListener) {
  document.addEventListener("DOMContentLoaded", window.tweetAutoEmbed, false);
  // A fallback to window.onload, that will always work
  window.addEventListener("load", window.tweetAutoEmbed, false);

  // If IE event model is used
} else if (document.attachEvent) {
  document.attachEvent("onreadystatechange", window.tweetAutoEmbed);
  // A fallback to window.onload, that will always work
  window.attachEvent("onload", window.tweetAutoEmbed);
}

// node js export
define('global',['require','exports','module'],function (require, exports, module) {
  module.exports = {
    getUrlPlaceholder: function (format) {
      return getUrlPlaceholder(format);
    }
  };
});
