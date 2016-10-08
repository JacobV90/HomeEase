///<reference path="../typings/index.d.ts"/>

var app = angular.module('app', ['ionic', 'app.controllers', 'app.services', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      window.StatusBar.styleLightContent();
    }

  });

})

.config(function($stateProvider, $urlRouterProvider,$httpProvider,$ionicConfigProvider, $cordovaFacebookProvider) {

  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

<<<<<<< HEAD
.state('roomie_payment', {
url: '/roomie_payment',
templateUrl: 'templates/roomie_payment.html',
controller: 'PaymentCtrl'
})

.state('rent_payment', {
url: '/rent_payment',
templateUrl: 'templates/rent_payment.html',
controller: 'PaymentCtrl'
})

=======
  .state('myhome', {
    url: '/myhome',
    templateUrl: 'templates/myhome.html',
    controller: 'MyhomeCtrl'
  })
>>>>>>> cc9eb4b1e4f47955a6ea3b255336ca145b7d6787

  .state('myroomies', {
    url: '/myroomies',
    templateUrl: 'templates/myroomeis.html',
    controller: 'MyroomiesCtrl'
  })

  .state('mybank ', {
    url: '/mybank',
    templateUrl: 'templates/mybank.html',
    controller: 'MybankCtrl'
  })

  .state('mydocuments', {
    url: '/mydocuments',
    templateUrl: 'templates/mydocuments.html',
    controller: 'MydocCtrl'
  })

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

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
