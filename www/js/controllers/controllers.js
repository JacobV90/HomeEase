/// <reference path="../../typings/tsd.d.ts" />
angular.module('app.controllers', ['ngOpenFB', 'ionic'])
    .controller('RoomiesCtrl', function ($scope, $ionicLoading) {
})
    .controller('HousingCtrl', function () {
})
    .controller('PaymentCtrl', function () {
})
    .controller('MoneyCtrl', function ($scope, $state) {
    $scope.pay_roomies = function () {
        console.log("pay roomies");
        $state.go("Payment");
    };
})
    .controller('InfoCtrl', function () {
    this.settings = {
        enableFriends: true
    };
})
    .controller('LoginCtrl', function ($scope, $ionicModal, $state, $log, $ionicPlatform, ngFB, $cordovaFacebook) {
    $scope.fbLogin = function () {
        $log.log("fblogin called");
        $cordovaFacebook.getLoginStatus();
        $cordovaFacebook.login(["public_profile", "email", "user_friends"])
            .then(function (success) {
            // { id: "634565435",
            //   lastName: "bob"
            //   ...
            // }
            $state.go('tab.roomies');
        }, function (error) {
            $log.log("luck my fife");
        });
        $scope.image_src = 'img/homeas.jpg';
    };
    $scope.gotoMain = function () {
        $state.go("tab.roomies");
    };
});
