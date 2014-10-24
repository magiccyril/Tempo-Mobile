'use strict';

/**
 * @ngdoc service
 * @name tempoApp.tempo
 * @description
 * # tempo
 * Factory in the tempoApp.
 */
angular.module('tempoLib')
  .constant('TEMPO_API_URL', 'http://api.tempo.18ruedivona.eu/tempo/')
  .constant('TEMPO_API_FROM_MONTH', 9)
  .constant('TEMPO_API_FROM_DAY', 1)
  .constant('TEMPO_API_COUNT_BLUE', 300)
  .constant('TEMPO_API_COUNT_WHITE', 43)
  .constant('TEMPO_API_COUNT_RED', 22)
  .factory('Tempo', [
    '$http',
    '$q',
    'TEMPO_API_URL',
    'TEMPO_API_FROM_MONTH',
    'TEMPO_API_FROM_DAY',
    'TEMPO_API_COUNT_BLUE',
    'TEMPO_API_COUNT_WHITE',
    'TEMPO_API_COUNT_RED',
    function ($http, $q, TEMPO_API_URL, TEMPO_API_FROM_MONTH, TEMPO_API_FROM_DAY, TEMPO_API_COUNT_BLUE, TEMPO_API_COUNT_WHITE, TEMPO_API_COUNT_RED) {
      var cache = {};

      var formatColor = function (data) {
        switch (data) {
          case 'blue':
            return 'Bleu';

          case 'white':
            return 'Blanc';

          case 'red':
            return 'Rouge';
        }
      };

      var getStartDate = function () {
        var date = moment();
        date.month(TEMPO_API_FROM_MONTH - 1);
        date.date(TEMPO_API_FROM_DAY);
        date.subtract(1, 'year');

        if (moment().month() + 1 >= TEMPO_API_FROM_MONTH) {
          date.add(1, 'year');
        }

        return date;
      };

      var getCounter = function () {
        var fromDate = getStartDate();

        if (moment().isLeapYear()) {
          TEMPO_API_COUNT_BLUE = TEMPO_API_COUNT_BLUE + 1;
        }

        return $http.get(TEMPO_API_URL + 'count/' + fromDate.format('YYYY-MM-DD') + '?' + moment().unix())
          .then(function (response) {
            return {
              'blue': TEMPO_API_COUNT_BLUE - response.data.blue,
              'white': TEMPO_API_COUNT_WHITE - response.data.white,
              'red': TEMPO_API_COUNT_RED - response.data.red
            };
          });
      };

      var formatData = function (data) {
        var formatedData = {};

        angular.forEach(data, function(item) {
          var dayDate = moment(item.date.year + '-' + item.date.month + '-' + item.date.day, 'YYYY-M-D');
          formatedData[dayDate.format('YYYY-MM-DD')] = {
            'raw': item.color,
            'formated': formatColor(item.color)
          };
        });

        return formatedData;
      };

      var fetch = function (date, noCache) {
        if (angular.isUndefined(noCache)) {
          noCache = false;
        }

        if (cache[date] && !noCache) {
          var deferred = $q.defer();
          deferred.resolve(cache[date]);
          return deferred.promise;
        }

        return $http.get(TEMPO_API_URL + date + '?' + moment().unix())
          .then(function (response) {
            cache[date] = formatData(response.data);
            return cache[date];
          });
      };

      var save = function (apikey, date, color) {
        if (!moment.isMoment(date)) {
          date = moment(date);
        }

        if (!date.isValid()) {
          return $q.reject('Invalid date');
        }

        if ('blue' !== color && 'white' !== color && 'red' !== color) {
          return $q.reject('Invalid color');
        }

        var data = {
          'year': date.format('YYYY'),
          'month': date.format('M'),
          'day': date.format('D'),
          'color': color
        };

        return $http.post(TEMPO_API_URL + '?apikey=' + apikey, data);
      };

      var remove = function (apikey, date) {
        if (!moment.isMoment(date)) {
          date = moment(date);
        }

        if (!date.isValid()) {
          return $q.reject('Invalid date');
        }

        return $http.delete(TEMPO_API_URL + date.format('YYYY-MM-DD') + '?apikey=' + apikey);
      };

      return {
        'formatColor': formatColor,
        'getStartDate': getStartDate,
        'getCounter': getCounter,
        'getMonth': function (date, noCache) {
          return fetch(date.format('YYYY-MM'), noCache);
        },
        'getYear': function (date, noCache) {
          return fetch(date.format('YYYY'), noCache);
        },
        'save': save,
        'delete': remove
      };
    }
  ]);
