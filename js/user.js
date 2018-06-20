
define('user', [],function () {

  //cleaning window hash coming from social login
  if (window.location.hash == "#_=_") {
    window.location.hash = "fblg";
  }

  return CurrentUser = {
    userId: null,
    screenName: null,
    userEmail: null,
    status: "not-logged",
    gender: null,
    birthdate: null,
    preferredLanguage: null,
    preferredLeague: null,
    preferredTeam: null,
    hasAvatar: null,
    country: null,
    fifacountry: null,
    newsLetter: null,
    hasFacebook: null,
    hasTwitter: null,
    hasGoogle: null,
    Init: function () {

      var c = Cookie.get("FIFACom");
      if (c) {
        CurrentUser.userId = Utility.toQueryParams(c).id;
        CurrentUser.screenName = decodeURI(Utility.toQueryParams(c).un);
        CurrentUser.FirstName = decodeURI(Utility.toQueryParams(c).fn);
        CurrentUser.LastName = decodeURI(Utility.toQueryParams(c).ln);
        CurrentUser.userEmail = Utility.toQueryParams(c).em;
        CurrentUser.status = "logged";
        CurrentUser.gender = Utility.toQueryParams(c).g;
        CurrentUser.birthdate = Utility.toQueryParams(c).bd;
        CurrentUser.preferredLanguage = Utility.toQueryParams(c).pln;
        CurrentUser.preferredLeague = Utility.toQueryParams(c).c1 + "," + Utility.toQueryParams(c).c2 + "," + Utility.toQueryParams(c).c3;
        CurrentUser.preferredTeam = Utility.toQueryParams(c).m1 + "," + Utility.toQueryParams(c).m2 + "," + Utility.toQueryParams(c).m3;
        CurrentUser.hasAvatar = (Utility.toQueryParams(c).av == "1") ? "true" : "false";
        CurrentUser.country = Utility.toQueryParams(c).ct;
        CurrentUser.fifacountry = Utility.toQueryParams(c).fct;
        CurrentUser.newsLetter = (Utility.toQueryParams(c).nl == "1") ? "true" : "false";
        CurrentUser.hasFacebook = (Utility.toQueryParams(c).fb == "1") ? "true" : "false";
        CurrentUser.hasTwitter = (Utility.toQueryParams(c).tw == "1") ? "true" : "false";
        CurrentUser.hasGoogle = (Utility.toQueryParams(c).gp == "1") ? "true" : "false";
        CurrentUser.isActivated = (Utility.toQueryParams(c).pl == "1") ? false : true;
        var ap = Utility.toQueryParams(c).ap;
        CurrentUser.apps = ap ? ap.substr(1, ap.length - 2).split('|') : false;
      }

    },

    GetFavouritesCookie: function () {

      var _this = this;
      var _cookie = null;
      var _mustParse = true;

      if (CurrentUser.status === "logged") {
        _cookie = Cookie.get("FIFACom");
      } else if (Cookie.get("fifa_favs")) {
        _cookie = unescape(Cookie.get("fifa_favs") || "");
      } else {
        _cookie = { k1: "", k2: "", k3: "", c1: "", c2: "", c3: "", m1: "", m2: "", m3: "" };
        _mustParse = false;
      }

      if (_cookie && _mustParse) {
        if (CurrentUser.status === "logged") {
          _cookie = Utility.toQueryParams(_cookie);
        } else {
          _cookie = JSON.parse(_cookie);
        }
      }

      return _cookie;
    },

    CompareFavourites: function (successCallback, mergeCallback, errorCallback) {

      var _userCookie = this.PopulateFromCookie("FIFACom");
      var _anonymousCookie = this.PopulateFromCookie("fifa_favs");
      var _mergeResult = { clubs: [], teams: [], competitions: [] };

      try {

        if (_userCookie) {
          for (var i = 0; i < _userCookie.clubs.length; i++) {
            _mergeResult.clubs.push(_userCookie.clubs[i].toString());
          }

          for (var i = 0; i < _userCookie.teams.length; i++) {
            _mergeResult.teams.push(_userCookie.teams[i].toString());
          }

          for (var i = 0; i < _userCookie.competitions.length; i++) {
            _mergeResult.competitions.push(_userCookie.competitions[i].toString());
          }
        }

        if (_anonymousCookie) {
          for (var i = 0; i < _userCookie.clubs.length; i++) {
            if (_anonymousCookie.clubs[i].toString() && _mergeResult.clubs.indexOf(_anonymousCookie.clubs[i].toString()) === -1) {

              var _emptyIndex = _mergeResult.clubs.indexOf("");

              if (_emptyIndex !== -1) {
                _mergeResult.clubs[_emptyIndex] = _anonymousCookie.clubs[i].toString();
              } else {
                _mergeResult.clubs.push(_anonymousCookie.clubs[i].toString());
              }
            }
          }

          for (var i = 0; i < _userCookie.teams.length; i++) {
            if (_anonymousCookie.teams[i].toString() && _mergeResult.teams.indexOf(_anonymousCookie.teams[i].toString()) === -1) {

              var _emptyIndex = _mergeResult.teams.indexOf("");

              if (_emptyIndex !== -1) {
                _mergeResult.teams[_emptyIndex] = _anonymousCookie.teams[i].toString();
              } else {
                _mergeResult.teams.push(_anonymousCookie.teams[i].toString());
              }
            }
          }

          for (var i = 0; i < _userCookie.competitions.length; i++) {
            if (_anonymousCookie.competitions[i].toString() && _mergeResult.competitions.indexOf(_anonymousCookie.competitions[i].toString()) === -1) {

              var _emptyIndex = _mergeResult.competitions.indexOf("");

              if (_emptyIndex !== -1) {
                _mergeResult.competitions[_emptyIndex] = _anonymousCookie.competitions[i].toString();
              } else {
                _mergeResult.competitions.push(_anonymousCookie.competitions[i].toString());
              }
            }
          }
        }

        if (_mergeResult.competitions.length > 3 || _mergeResult.teams.length > 3 || _mergeResult.clubs.length > 3) {
          mergeCallback(_mergeResult);
        }
        else {
          successCallback(_mergeResult);
        }
      } catch (e) {
        errorCallback(e);
      }

    },

    HasFavorites: function () {
      var _this = this;
      var _cookie = _this.PopulateFromCookie();
      var _hasFavorite = false;

      for (var i = 0; i < _cookie.competitions.length; i++) {
        if (_cookie.competitions[i]) {
          _hasFavorite = true;
          break;
        }
      }

      if (!_hasFavorite) {
        for (var i = 0; i < _cookie.teams.length; i++) {
          if (_cookie.teams[i]) {
            _hasFavorite = true;
            break;
          }
        }
      }

      if (!_hasFavorite) {
        for (var i = 0; i < _cookie.clubs.length; i++) {
          if (_cookie.clubs[i]) {
            _hasFavorite = true;
            break;
          }
        }
      }

      return _hasFavorite;
    },

    PopulateFromCookie: function (cookieName) {
      var _this = this;
      var _favsObj = { clubs: [], teams: [], competitions: [] };
      var _cookie = null;

      if (cookieName) {
        if (cookieName === "FIFACom") {
          _cookie = Cookie.get("FIFACom");
          _cookie = Utility.toQueryParams(_cookie);
        } if (cookieName === "fifa_favs") {
          _cookie = unescape(Cookie.get("fifa_favs") || "");
          _cookie = JSON.parse(_cookie);
        }
      } else {
        _cookie = _this.GetFavouritesCookie();
      }

      _favsObj.clubs.push(_cookie.k1);
      _favsObj.clubs.push(_cookie.k2);
      _favsObj.clubs.push(_cookie.k3);

      _favsObj.teams.push(_cookie.m1);
      _favsObj.teams.push(_cookie.m2);
      _favsObj.teams.push(_cookie.m3);

      _favsObj.competitions.push(_cookie.c1);
      _favsObj.competitions.push(_cookie.c2);
      _favsObj.competitions.push(_cookie.c3);

      return _favsObj;
    },

    //ClearFavorites: function (successCallback, errorCallback) {
    //  var _this = this;
    //  var _favsObj = { clubs: [], teams: [], competitions: [] };
    //  var _cookie = _this.GetFavouritesCookie();

    //  _cookie = { k1: "", k2: "", k3: "", c1: "", c2: "", c3: "", m1: "", m2: "", m3: "" };

    //  _favsObj.clubs.push(_cookie.k1);
    //  _favsObj.clubs.push(_cookie.k2);
    //  _favsObj.clubs.push(_cookie.k3);

    //  _favsObj.teams.push(_cookie.m1);
    //  _favsObj.teams.push(_cookie.m2);
    //  _favsObj.teams.push(_cookie.m3);

    //  _favsObj.competitions.push(_cookie.c1);
    //  _favsObj.competitions.push(_cookie.c2);
    //  _favsObj.competitions.push(_cookie.c3);

    //  _this.SaveFavourites(_favsObj, successCallback, errorCallback);
    //},

    SaveFavourites: function (favsObj, successCallback, errorCallback) {
      var _this = this;
      var _cookie = _this.GetFavouritesCookie();

      try {

        if (CurrentUser.status === "logged") {
          var _post = {
            i_ma1: favsObj.teams[0],
            i_ma2: favsObj.teams[1],
            i_ma3: favsObj.teams[2],
            i_cl1: favsObj.clubs[0],
            i_cl2: favsObj.clubs[1],
            i_cl3: favsObj.clubs[2],
            i_cm1: favsObj.competitions[0],
            i_cm2: favsObj.competitions[1],
            i_cm3: favsObj.competitions[2],
            i_NewsLetter: (_cookie.nl === "1") ? "true" : "false",
            i_StoreNewsLetter: (_cookie.sn === "1") ? "true" : "false",
            addFavourites: "true"
          };

          var settings = {
            async: true,
            url: '$cfgenv.saveFavouritesAPIUrl$',
            method: 'POST',
            data: _post,
            success: function (data) { successCallback(data, favsObj) },
            error: function (data) { errorCallback(data, favsObj) }
          };

          $.ajax(settings).done(function (response) {

          });
        } else {

          var _anonymousFavsCookie = {
            k1: favsObj.clubs[0],
            k2: favsObj.clubs[1],
            k3: favsObj.clubs[2],
            c1: favsObj.competitions[0],
            c2: favsObj.competitions[1],
            c3: favsObj.competitions[2],
            m1: favsObj.teams[0],
            m2: favsObj.teams[1],
            m3: favsObj.teams[2]
          };

          Cookie.set("fifa_favs", JSON.stringify(_anonymousFavsCookie), 30);
          successCallback(favsObj);
        }

      } catch (e) {
        errorCallback(favsObj);
      }

    },

    UpdateFavorites: function (favType, favIdOld, favIdNew, successCallback, errorCallback) {
      var _this = this;
      var _favsObj = _this.PopulateFromCookie();

      if (!favType) { return; }
      if (!favIdOld) { return; }
      if (!favIdNew) { return; }
      if (!_favsObj[favType]) { return; }

      try {
        for (var i = 0; i < _favsObj[favType].length; i++) {
          if (_favsObj[favType][i].toString() === favIdOld.toString()) {
            _favsObj[favType][i] = favIdNew;
            break;
          }
        }

        _this.SaveFavourites(_favsObj, successCallback, errorCallback);
      } catch (e) {
        if (errorCallback) { errorCallback(_favsObj); }
      }
    },

    AddFavourites: function (favType, favId, successCallback, errorCallback, overflowCallback) {
      var _this = this;
      var _availableSlots = false;

      var _favsObj = _this.PopulateFromCookie();

      if (!favType) { return; }
      if (!favId) { return; }
      if (!_favsObj[favType]) { return; }

      try {


        for (var i = 0; i < _favsObj[favType].length; i++) {
          if (_favsObj[favType][i].toString() === favId.toString()) {
            _availableSlots = true;
            break;
          }

          if (_favsObj[favType][i] === "") {
            _favsObj[favType][i] = favId;
            _availableSlots = true;
            break;
          }
        }

        if (_availableSlots) {
          _this.SaveFavourites(_favsObj, successCallback, errorCallback);
        }
        else {
          if (overflowCallback) {
            overflowCallback(_favsObj);
          }
        }

      } catch (e) {
        if (errorCallback) { errorCallback(_favsObj); }
      }

    },

    RemoveFavourites: function (favType, favId, successCallback, errorCallback) {
      var _this = this;
      var _favsObj = _this.PopulateFromCookie();

      if (!favType) { return; }
      if (!favId) { return; }
      if (!_favsObj[favType]) { return; }

      try {

        for (var i = 0; i < _favsObj[favType].length; i++) {

          if (_favsObj[favType][i].toString() === favId.toString()) {
            _favsObj[favType][i] = "";
            _availableSlots = true;
            break;
          }
        }

        _this.SaveFavourites(_favsObj, successCallback, errorCallback);

      } catch (e) {
        if (errorCallback) { errorCallback(_favsObj); }
      }

    }


  };

  window.CurrentUser = CurrentUser;
});
