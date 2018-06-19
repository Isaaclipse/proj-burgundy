
define('geodetect', ['jquery'], function ($) {

  var GeoDetect = {
    geoDataSet: function ($obj, url, country) {

      $.ajax({
        type: 'get',
        dataType: 'html',
        url: url.replace('{country}', country)
      }).done(function (data) {
        $obj.html(data);
      });
    },

    init: function () {
      $('[data-geo-lib]').each(function () {
        var $geoIncluder = $(this),
            _country = $geoIncluder.data('geo-fallback'), // default
            _geoDetectUrl = $geoIncluder.data('geo-detect'),
            _geoLibUrl = $geoIncluder.data('geo-lib'),
            _esiCountry = $geoIncluder.data('esi-country').trim();

        if (_esiCountry) {
          GeoDetect.geoDataSet($geoIncluder, _geoLibUrl, _esiCountry);
          return;
        }

        if (window.localStorage && window.localStorage.getItem('__d3__geo_detection__')) {
          GeoDetect.geoDataSet($geoIncluder, _geoLibUrl, window.localStorage.getItem('__d3__geo_detection__'));
          return;
        }
        if (_geoDetectUrl) {
          // Call geo detection library

          $.ajax({
            type: 'get',
            url: _geoDetectUrl,
            dataType: 'html'
          }).done(function (data) {
            if (data.indexOf('<esi:') === -1) {
              _country = data;
            }
            // Load geo library
            GeoDetect.geoDataSet($geoIncluder, _geoLibUrl, _country);
          });
        } else {
          // Load default geo library
          GeoDetect.geoDataSet($geoIncluder, _geoLibUrl, _country);
        }
      });
    }
  };

  $(document).ready(function () {
    GeoDetect.init();
  });

  return GeoDetect;
});

