///<reference path="../typings/index.d.ts"/>

var app = angular.module('app', ['ionic', 'app.controllers', 'app.services', 'ngCordova','firebase'])

.run(function($ionicPlatform, firebase) {
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

.directive('fallbackSrc', function () {
  return {
    restrict: 'A',
    link: function(scope, element, attrs){
      element.attr('src', attrs.fallbackSrc);
			element.bind('error', function(){
			     element.attr('src', attrs.fallbackSrc);
			});
    }
  };
})

.config(function($stateProvider, $urlRouterProvider,$httpProvider, $ionicConfigProvider, $cordovaFacebookProvider) {

  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    resolve: {
        // controller will not be loaded until $requireSignIn resolves
        // Auth refers to our $firebaseAuth wrapper in the factory below
        "currentAuth": ["Auth", function(Auth) {
          // $requireSignIn returns a promise so the resolve waits for it to complete
          // If the promise is rejected, it will throw a $stateChangeError (see above)
          return Auth.$requireSignIn();
        }]
      }
  })

  .state('tab.myhome', {
    url: '/myhome',
    templateUrl: 'templates/myhome.html',
    controller: 'MyhomeCtrl'
  })

  .state('tab.myroomies', {
    url: '/myroomies',
    templateUrl: 'templates/myroomeis.html',
    controller: 'MyroomiesCtrl'
  })

  .state('tab.mybank ', {
    url: '/mybank',
    templateUrl: 'templates/mybank.html',
    controller: 'MybankCtrl'
  })

  .state('tab.mydocuments', {
    url: '/mydocuments',
    templateUrl: 'templates/mydocuments.html',
    controller: 'MydocCtrl'
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
