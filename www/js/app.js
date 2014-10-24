angular.module('tempoApp', ['ionic', 'tempoApp.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.tempo', {
      url: "/tempo",
      views: {
        'menuContent' :{
          templateUrl: "templates/tempo.html",
          controller: 'TempoCtrl'
        }
      }
    })

    .state('app.ejp', {
      url: "/ejp",
      views: {
        'menuContent' :{
          templateUrl: "templates/ejp.html",
          controller: 'EjpCtrl'
        }
      }
    })
    .state('app.settings', {
      url: "/settings",
      views: {
        'menuContent' :{
          templateUrl: "templates/settings.html",
          controller: 'SettingsCtrl'
        }
      }
    })

    .state('app.contact', {
      url: "/contact",
      views: {
        'menuContent' :{
          templateUrl: "templates/contact.html",
          controller: 'ContactCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/tempo');
});

