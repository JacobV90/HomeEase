/// <reference path="../typings/tsd.d.ts" />
/// <reference path="controllers/controllers.ts" />
/// <reference path="services/services.ts" />


angular.module('app', ['ionic', 'app.controllers', 'app.services'])

.run(function($ionicPlatform) {
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
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
  url: '/',
  templateUrl: 'templates/login.html'
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
        controller: 'RoomiesCtrl as roomies'
      }
    }
  })

  .state('tab.housing', {
      url: '/housing',
      views: {
        'tab-housing': {
          templateUrl: 'templates/tab-housing.html',
          controller: 'HousingCtrl as housing'
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
        controller: 'InfoCtrl as info'
      }
    }
  });

  $urlRouterProvider.otherwise('/');
});
