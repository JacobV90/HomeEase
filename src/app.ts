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

  .state('menu', {
    url: '/menu',
    templateUrl: 'templates/menu.html',
    abstract: true,
    controller: 'MenuCtrl',
    resolve: {

        "currentAuth": ["Auth", function(Auth) {

          return Auth.$requireSignIn();
        }]
      }
  })

  .state('menu.favorites', {
    url: '/favorites',
    views:{
      'menu':{
        templateUrl: 'templates/favorites.html',
      }
    }
  })

  .state('menu.favorites.homes', {
    url: '/homes',
    views: {
      'favorite-homes': {
        templateUrl: 'templates/favorite-homes.html',
        controller: 'FavoritesCtrl'
      }
    }
  })

  .state('menu.favorites.roomies', {
    url: '/roomies',
    views: {
      'favorite-roomies': {
        templateUrl: 'templates/favorite-roomies.html',
        controller: 'FavoritesCtrl'
      }
    }
  })

  .state('menu.search', {
    url: '/search',
    views:{
      'menu':{
        templateUrl: 'templates/search.html',
      }
    }
  })

  .state('menu.search.homes', {
    url: '/homes',
    views:{
      'search-homes':{
        templateUrl: 'templates/search-homes.html',
        controller: 'HousingCtrl'
      }
    }
  })

  .state('menu.search.roomies', {
    url: '/roomies',
    views:{
      'search-roomies':{
        templateUrl: 'templates/search-roomies.html',
        controller: 'RoomiesCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/login');

});
