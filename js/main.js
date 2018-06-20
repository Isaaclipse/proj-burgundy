// main entry point

require(['jquery', 'utility', 'headroom', 'waypoints', 'fi_select', 'placeholder', 'gridview',
	'bootstrap_transition', 'bootstrap_collapse', 'bootstrap_scrollspy', 'bootstrap_modal',
	'geodetect', 'cookiebanner', 'adv', 'cookie', 'header', 'sharing'], function ($, Utility, Headroom, Cookie) {
	  //on ready dom
	  $(document).ready(function () {
	    var $body = $('body');

	    // autoclose dropdown menu
	    $('html').on('touchstart click', function (e) {
	      var $target = $(e.target);
	      var active_menu_item = $('.fi-site-header .active > a[data-dropdown]');
	      if (active_menu_item.length && !(($target.is('a[data-dropdown]') || $target.closest('a[data-dropdown]').length || $target.closest('.fi-site-header__dropdown-wrap').length))) {
	        active_menu_item.parent().removeClass('active');
	        $('.fi-site-header__dropdown-wrap > div > div').addClass('hidden');
	        $body.removeClass("fi-site-dropdown-open fi-site-dropdown-second-level-open");
	      }
	    });

	    // back to top page link
	    $('.fi-back-to-top > a').on('click', function (e) {
	      e.preventDefault();
	      Utility.scrollTop();
	    });


	    var $logoutButton = $("#fi-logout-signout-link");

	    $logoutButton.on('click', function () {
	      Utility.deleteCookie();
	    })

	    // PRE 2018 NAVIGATION SECTION HEADER (DROPDOWN IN SITE HEADER)
	    //$(".fi-section-header-link__title").text($(".fi-second-level-box__title").text());
	    //$(".fi-section-header-link__date").text($(".fi-second-level-box__date").text());

	    ////Section header 
	    //if ($('.fi-second-level-box').length > 0) {

	    //    $(".fi-section-header-link-mobile").removeClass("hidden");

	    //    var waypoint_header = new Waypoint({
	    //        element: $body,
	    //        offset: -100,
	    //        handler: function (direction) {

	    //            if (direction == 'down') {
	    //                $('.fi-site-header > div > .fi-corporate-links').addClass('hidden');
	    //                $('.fi-section-header-link').removeClass('hidden');
	    //                $('.fi-second-level-box').addClass('not-visible');
	    //                $('.fi-site-header__dropdown__sectionheader').addClass('hidden');
	    //            } else {	// up
	    //                $('.fi-site-header > div > .fi-corporate-links').removeClass('hidden');
	    //                $('.fi-section-header-link').addClass('hidden');
	    //                $('.fi-second-level-box').removeClass('not-visible');

	    //                if (!Utility.isMobile()) {
	    //                    $('.fi-site-header__dropdown__sectionheader').addClass('hidden');
	    //                    $body.removeClass('fi-site-dropdown-open');
	    //                    $body.removeClass('fi-site-dropdown-second-level-open');
	    //                    $('.fi-section-header-link > li, .fi-section-header-link-mobile > li').removeClass('active');
	    //                }
	    //            }
	    //        }
	    //    });
	    //}

	    // back to top
	    var waypoint_back_top = new Waypoint({
	      element: $body,
	      offset: -100,
	      handler: function (direction) {
	        $(".fi-back-to-top").toggleClass("affix");
	      }
	    });
	    $(function () {
	      $(document).on("scroll", onScroll);
	    });
	    function onScroll() {
	      var scrollPos = $(document).scrollTop();
	      $('.fi-page-nav__menu a').each(function () {
	        var currLink = $(this);
	        if (currLink.attr("href").indexOf("#") > -1) {
	          var refElement = $(currLink.attr("href"));
	          if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
	            $('.fi-page-nav__menu li a').removeClass("active");
	            currLink.addClass("active");
	          } else {
	            currLink.removeClass("active");
	          }
	        }

	      });
	    }

	    var $pageHeader = $(".fi-pageheader");

	    var anchorOffset = 160;

	    if ($pageHeader.length > 0) {

	      $('body').scrollspy({ target: '.fi-pageheader', offset: anchorOffset });

	      $('.fi-page-nav').on('clear.bs.scrollspy', function (e, activeTarget) {

	        if (!activeTarget) {
	          $("ul.fi-page-nav li:first").addClass("active");
	        }
	      })

	    }

	    //page nav anchor
	    $(".fi-page-nav li a").on("click", function (e) {
	      if ($(this).attr('href').indexOf('#') > -1) {
	        $(".fi-page-nav li a").removeClass("active");
	        var top_offset = 300;
	        var top_offset_mobile = 220;
	        var top_offset_tablet = 260;

	        if ($pageHeader.hasClass('affix')) {
	          top_offset = 120;
	          top_offset_mobile = 100;
	          top_offset_tablet = 120;
	        }

	        e.preventDefault();

	        var _active = $(e.currentTarget);
	        _active.addClass("active");


	        $('body').scrollspy('refresh');
	        top_offset = (Utility.isMobile() ? top_offset_mobile : (Utility.isTablet() ? top_offset_tablet : top_offset))
	        //var top_offset = Utility.isTablet() ? 120 : anchorOffset - 10;

	        Utility.scrollTo($body.find($(this).attr('href')), top_offset, 0);
	      }
	    });

	    // workaround for AppView
	    if ($body.hasClass("fi-appview")) {
	      $(this).find(".fi-article__header").removeClass("fi-site-header");

	    } else {
	      //auto hide header
	      var myElement = document.querySelector("fi-site-header");
	      var options_headroom = {
	        // css classes to apply
	        offset: 150,
	        classes: {
	          // when element is initialised
	          initial: "fi-site-header",
	          // when scrolling up
	          pinned: "fi-site-header--pinned",
	          // when scrolling down
	          unpinned: "fi-site-header--unpinned",
	          // when above offset
	          top: "fi-site-header--top",
	          // when below offset
	          notTop: "fi-site-header--not-top",
	          // when at bottom of scoll area
	          bottom: "fi-site-header--bottom",
	          // when not at bottom of scroll area
	          notBottom: "fi-site-header--not-bottom"
	        }
	      };
	      if (myElement !== null) {
	        var headroom = new Headroom(myElement, options_headroom);
	        headroom.init();
	      }
	    }

	    // social share
	    $('.fi-social-share__icons--share').on('click', function (e) {
	      (function (d, s, id) {
	        var js, fjs = d.getElementsByTagName(s)[0];
	        if (d.getElementById(id)) return;
	        js = d.createElement(s); js.id = id;
	        js.src = "//connect.facebook.net/" + Global.culture + "/sdk.js#xfbml=1&version=v3.0";
	        fjs.parentNode.insertBefore(js, fjs);
	      }(document, 'script', 'facebook-jssdk'));

	      window.twttr = window.twttr || (function (d, s, id) {
	        var js, fjs = d.getElementsByTagName(s)[0],
						t = window.twttr || {};
	        if (d.getElementById(id)) return t;
	        js = d.createElement(s);
	        js.id = id;
	        js.src = "https://platform.twitter.com/widgets.js";
	        fjs.parentNode.insertBefore(js, fjs);

	        t._e = [];
	        t.ready = function (f) {
	          t._e.push(f);
	        };

	        return t;
	      }(document, "script", "twitter-wjs"));

	      (function (d, s, id) {
	        var js, fjs = d.getElementsByTagName(s)[0];
	        if (d.getElementById(id)) return;
	        js = d.createElement(s); js.id = id;
	        js.async = true;
	        js.defer = true;
	        js.src = "https://apis.google.com/js/platform.js";
	        fjs.parentNode.insertBefore(js, fjs);
	      }(document, 'script', 'gplus-sdk'));

	      e.preventDefault();
	      $(".fi-social-share").toggleClass("active");
	    });

	    $('.fi-tt__social-label').on('click', function (e) {
	      $('.fi-social-share__icons--share').click();
	    });

	    //print
	    $('.fi-icon-print').on('click', function (e) {
	      e.preventDefault();
	      window.print();
	    });

	    // X close button on sectionheader and search
	    $('.fi-site-header__dropdown__sectionheader .fi-icon-close').on('click', function (e) {
	      $('.fi-site-header__dropdown__sectionheader').addClass('hidden');
	      $body.removeClass('fi-site-dropdown-second-level-open');
	    });
	    $('.fi-site-header__dropdown__search .fi-icon-close').on('click', function (e) {
	      $('.fi-site-header__dropdown__search').addClass('hidden');
	      $('.fi-icons-bar__search').removeClass('active');
	      $body.removeClass('fi-site-dropdown-open');
	    });
	    var params = Utility.toQueryParams(window.location.href);
	    if (params.css_gridview === "true") {
	      $("#gridTable").removeClass("hidden");
	    }

	    // tab navigation in mobile
	    // COMMENTED BY GIAN, IT BREAKS THE MATCHES INDEX TABS NAVIGATION ON MOBILE
	    //if (Utility.isMobile()) {
	    //	$('.tabs-nav .tab-item').on('click', function (e) {
	    //		$this = $(this);
	    //		if ($this.siblings().height() == 0) {
	    //			e.preventDefault();
	    //			$this.parents('.tabs-nav').find('a').css('display', 'block');
	    //			$this.find('a').addClass('fi-after--remove');
	    //		}
	    //		else {
	    //			$this.parents('.tabs-nav').find('a').css('display', 'none');
	    //			$this.find('a').removeClass('fi-after--remove');
	    //		}
	    //	});
	    //}

	    Utility.showDataAssets();
	  });
	});



define("main", function(){});

