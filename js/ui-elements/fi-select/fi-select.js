
/* fifa select */

define('fi_select', ['jquery', 'utility'], function ($, Utility) {

  $.fn.fi_select = function (options) {
    
    if (!options) {
      options = {};
    }

    var _this = this;

    if (Utility.isMobile() || Utility.isTablet()) {
      $('.fi-select', this).show();
      $('.dropdown-menu', this).hide();
      $('.btn-select', this).hide();
    }

    if (Utility.isMobile()) {
      for (var i = 0; i < $('.fi-select option').length; i++) {
        var _opt = $('.fi-select option')[i];
        $(_opt).text($(_opt).data('abbr'));
      }
    }

    $(_this).find('.dropdown-menu > li').on('click', function (e) {
      e.preventDefault();
      var _active = $(e.currentTarget);
      _active.siblings().removeClass("active");
      _active.addClass("active");

      var select_text = $(_active).html();
      $(_this).find('.fi-selected-item').html(select_text);
    });

    $(_this).find('.fi-select').on('change', function (e) {
      e.preventDefault() 
    });

    if (options.initLanguages) {
      initLanguageDD();
    }
 
    
    /* dropdown closure by clicking outside */

    $(document).mouseup(function (e) {
      var container = $(".dropdown");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        $(_this).removeClass('open');
      }
    });

    $(this).on('click', function (e) {
      $(this).toggleClass('open');
    });

    function initLanguageDD() {
      var lang = $(_this).data("lang");

      var select_item = $(_this).find('.fi-select > option[value = ' + lang + ']');
      var select_text = $(select_item).html();

      $(_this).find('.fi-selected-item').html(select_text);

      var list_item = $(_this).find('.dropdown-menu > li[data-value = ' + lang + ']');
      select_item.prop('selected', true);
      list_item.addClass('active');

      $(_this).find('.dropdown-menu > li').on('click', function (e) {
        e.preventDefault();
        var _this = this;
        var _location = $(_this).find('a').attr('href');
        _location = [_location, window.location.pathname, window.location.search, window.location.hash].join('');
      
        window.location = _location;

      });

      $(_this).find('.fi-select').on('change', function (e) {
        e.preventDefault();

        var _optionSelected = $("option:selected", e.target);

        var _langSelected;
        if (_optionSelected.parents().hasClass('fi-select__languages')) {
          _langSelected = $(_optionSelected).attr('value');
        }

        if (!_langSelected) { return; }

        var _currentPath = window.location.pathname;
        var _currentLink = $('.fi-select-wrapper.fi-select__languages li[data-value="' + _langSelected + '"] a').attr('href');

        _currentLink += _currentPath;
        window.location.href = _currentLink;
      });

    }
  };

  $('body').trigger('fi_select:loaded');

});
