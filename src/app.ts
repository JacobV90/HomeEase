/// <reference path="../typings/tsd.d.ts" />
/// <reference path="controllers/controllers.ts" />


angular.module('app', ['ionic', 'app.controllers', 'ngOpenFB', 'ngCordova'])

.run(function($ionicPlatform, ngFB) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      window.StatusBar.styleLightContent();
    }
    /*var id = "1383432301671180";
    var version = "v2.7"; // or leave blank and default is v2.0

    ngFB.init({appId: id});*/

  });

  //ngFB.init({appId: '1383432301671180'});
})

.config(function($stateProvider, $urlRouterProvider,$httpProvider,$ionicConfigProvider, $cordovaFacebookProvider) {

  var id = '1383432301671180';
  var version = "v2.7"; // or leave blank and default is v2.0

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
  url: '/login',
  templateUrl: 'templates/login.html',
  controller: 'LoginCtrl'
})


  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.roomies', {
    url: '/roomies',
    views: {
      'tab-roomies': {
        templateUrl: 'templates/tab-roomies.html',
        controller: 'RoomiesCtrl'
      }
    }
  })

  .state('tab.housing', {
      url: '/housing',
      views: {
        'tab-housing': {
          templateUrl: 'templates/tab-housing.html',
          controller: 'HousingCtrl'
        }
      }
    })

    .state('tab.money', {
      url: '/money',
      views: {
        'tab-money': {
          templateUrl: 'templates/tab-money.html',
          controller: 'MoneyCtrl as money'
        }
      }
    })

  .state('tab.info', {
    url: '/info',
    views: {
      'tab-info': {
        templateUrl: 'templates/tab-info.html',
        controller: 'InfoCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/login');
});
