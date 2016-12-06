///<reference path="../typings/index.d.ts"/>

var app = angular.module('app', ['ionic', 'app.controllers', 'app.services', 'ngCordova','firebase'])

.run(function($ionicPlatform, firebase, $window) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      window.StatusBar.styleDefault();
    }

      /*if($window.plugin){
      var div = $window.document.getElementById("map_canvas");
      var map = $window.plugin.google.maps.Map.getMap(div);

      map.addEventListener($window.plugin.google.maps.event.MAP_READY, onMapReady);
    }*/

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

  .state('map', {
    url: '/map',
    templateUrl: 'templates/map.html',
    controller: 'MapCtrl',
    params: {
      fav_props: {}
    }
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

  .state('menu.main', {
    url: '/main',
    abstract: true,
    views:{
      'menu':{
        templateUrl: 'templates/main.html'
      }
    }
  })

  .state('menu.main.home',{
    url: '/home',
    views: {
      'main-home': {
        templateUrl: 'templates/main-home.html',
        controller: 'MainHomeCtrl'
      }
    }
  })

  .state('menu.main.roomies',{
    url: '/roomies',
    views: {
      'main-roomies': {
        templateUrl: 'templates/main-roomies.html',
        controller: 'MainRoomiesCtrl'
      }
    }
  })

  .state('menu.favorites', {
    url: '/favorites',
    abstract: true,
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
        controller: 'FavoriteHomesCtrl'
      }
    }
  })

  .state('menu.favorites.roomies', {
    url: '/roomies',
    views: {
      'favorite-roomies': {
        templateUrl: 'templates/favorite-roomies.html',
        controller: 'FavoriteRoomiesCtrl'
      }
    }
  })

  .state('menu.search', {
    url: '/search',
    abstract: true,
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
        controller: 'SearchHomesCtrl'
      }
    }
  })

  .state('menu.search.roomies', {
    url: '/roomies',
    views:{
      'search-roomies':{
        templateUrl: 'templates/search-roomies.html',
        controller: 'SearchRoomiesCtrl'
      }
    }
  })

  .state('menu.chatrooms', {
        url: '/chatrooms',
        views: {
            'menu': {
                templateUrl: 'templates/chatrooms.html',
                controller: 'ChatroomsCtrl'
            }
        }
    })

  .state('menu.messages', {
        url: '/chatrooms/:roomId',
        views: {
          'menu':{
            templateUrl: 'templates/chatroom-messages.html',
            controller: 'ChatCtrl'
          }
        }
  })

  .state('menu.about', {
    url: '/about',
    views:{
      'menu':{
        templateUrl: 'templates/about.html',
        controller: 'AboutCtrl'
      }
    }
  })

  .state('menu.documents', {
    url: '/documents',
    views:{
      'menu':{
        templateUrl: 'templates/documents.html',
        controller: 'DocumentCtrl'
      }
    }
  })

  .state('menu.money', {
    url: '/money',
    views:{
      'menu':{
        templateUrl: 'templates/money.html',
        controller: 'MoneyCtrl'
      }
    }
  })

  .state('menu.profile', {
    url: '/profile',
    views:{
      'menu':{
        templateUrl: 'templates/profile.html',
        controller: 'ProfileCtrl'
      }
    }
  });


  $urlRouterProvider.otherwise('/login');

});
