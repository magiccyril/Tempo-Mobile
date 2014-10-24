'use strict';

angular.module('tempoApp.directives', [])

.directive('ejpForecastItem', [function() {
  return {
    link: function (scope, element) {
      var setClass = function () {
        element.attr({
          'class': '',
          'title': 'Jour non déterminé'
        });

        if (scope.model && true === scope.model.raw) {
          element.attr({
            'class': 'forecast-ejp-item-ejp',
            'title': 'Jour EJP'
          });
        }

        if (scope.model && false === scope.model.raw) {
          element.attr({
            'class': 'forecast-ejp-item-not',
            'title': 'Jour non EJP'
          });
        }
      };

      scope.$watch('model', setClass);
    },
    restrict: 'A',
    scope: {
      model:'=ngModel'
    },
    templateUrl: 'views/directives/ejpForecastItem.html',
    transclude: true
  };
}]);
