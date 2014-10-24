angular.module('tempoApp.controllers', ['tempoLib'])

.controller('AppCtrl', function($scope, $timeout) {
})

.controller('TempoCtrl', function($scope, Forecast, Tempo) {
  $scope.todayDate        = moment();
  $scope.tomorrowDate     = moment().add(1, 'days');
  if (moment().hours > 0 && moment.hours < 6) {
    $scope.todayDate.subtract(1, 'days');
    $scope.tomorrowDate.subtract(1, 'days');
  }

  Forecast.fetch().then(function (data) {
    $scope.forecast = data;
  });

  Tempo.getCounter().then(function (data) {
    $scope.tempoCounter = data;
  });
})

.controller('EjpCtrl', function($scope, Forecast, EJP) {
  $scope.todayDate        = moment();
  $scope.tomorrowDate     = moment().add(1, 'days');
  if (moment().hours > 0 && moment.hours < 6) {
    $scope.todayDate.subtract(1, 'days');
    $scope.tomorrowDate.subtract(1, 'days');
  }

  Forecast.fetch().then(function (data) {
    $scope.forecast = data;
  });

  EJP.getCounter().then(function (data) {
    $scope.ejpCounter = data;
  });
})

.controller('ContactCtrl', function($scope) {
})

.controller('SettingsCtrl', function($scope) {
});
