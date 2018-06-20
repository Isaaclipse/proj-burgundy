require(['jquery'], function ($) {
  $(document).ready(function () {

    var teamlistContainer = $('.fi-teams-list');

    var mobileItems = teamlistContainer.attr("data-mobile");
    var tabletItems = teamlistContainer.attr("data-tablet");
    var desktopItems = teamlistContainer.attr("data-desktop");

    var edtListContainer = $('.fi-edtlist');
    var pageTitle = $('.fi-page-title');
    var pageHeaderContainer = $('.fi-pageheader-teams');
    var filterContainer = $('.fi-filter-select', pageHeaderContainer);

    teamlistContainer.find('.fi-team-card').each(function (i) {
      var team = $(this);
      var idTeam = team.attr('data-team');
      var imgTeam = edtListContainer.find('div[data-team=' + idTeam + '] figure').html();
      team.find('.fi-team-card__img').html(imgTeam);
    });

    if (pageHeaderContainer.length > 0) {
      if (pageTitle.length > 0) {
        var pageTitleText = pageTitle.text();
        pageTitle.parent().prepend(pageHeaderContainer);
        pageTitle.remove();
      }
    }

    filterContainer.find("select").change(function () {
      var _value = this.value;


      $("[data-filter]").removeClass("card-hide").removeClass("force-order");

      if (_value !== "") {
        $("[data-filter]").not("[data-filter=" + _value + "]").addClass("card-hide");
      }
      else {
        _value = filterContainer.find("div.default-label").text();
      }

      if (Utility.isMobile()) {
        $("[data-filter]").not(".card-hide").filter(":lt(" + mobileItems + ")").addClass("force-order");
      } else if (Utility.isTablet()) {
        $("[data-filter]").not(".card-hide").filter(":lt(" + tabletItems + ")").addClass("force-order");
      } else {
        $("[data-filter]").not(".card-hide").filter(":lt(" + desktopItems + ")").addClass("force-order");
      }

      filterContainer.find('span').text(_value);

    });

  });

});