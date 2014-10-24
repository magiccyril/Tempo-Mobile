'use strict';

/**
 * @ngdoc service
 * @name tempoApp.mandrill
 * @description
 * # mandrill
 * Factory in the tempoApp.
 */
angular.module('tempoApp')
  .constant('MANDRILL_API_URL', 'https://mandrillapp.com/api/1.0/')
  .factory('Mandrill', ['$http', '$q', 'MANDRILL_APIKEY', 'MANDRILL_API_URL',
  function($http, $q, MANDRILL_APIKEY, MANDRILL_API_URL) {
    var ping = function () {
      return $http({
        method: 'POST',
        url: MANDRILL_API_URL + '/users/ping2.json',
        params: {
          'key': MANDRILL_APIKEY
        }
      });
    };

    var send = function (message) {
      return $http.post(MANDRILL_API_URL + '/messages/send.json', {
        'key': MANDRILL_APIKEY,
        'message': message
      }).then(function (response) {
        var data = response.data;

        var i = 0;
        var success = true;
        if (0 === data.length) {
          success = false;
        }
        while (success && i < data.length) {
          if (data[i].status === 'rejected' || data[i].status === 'invalid') {
            success = false;
          }

          i++;
        }

        if (!success) {
          return $q.reject();
        }

        return true;
      });
    };

    return {
      'ping': ping,
      'sendMessage': send
    };
  }
]);
