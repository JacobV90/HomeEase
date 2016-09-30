angular.module('app', ['ionic', 'app.controllers', 'ngOpenFB', 'ngCordova'])
    .run(function ($ionicPlatform, ngFB) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            window.StatusBar.styleLightContent();
        }
    });
})
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider, $cordovaFacebookProvider) {
    var id = '1383432301671180';
    var version = "v2.7";
    $stateProvider
        .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
    })
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
//# sourceMappingURL=app.js.map