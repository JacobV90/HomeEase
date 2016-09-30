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
        $state.go("roomie_payment");
    };
})
    .controller('MoneyCtrl', function ($scope, $state) {
    $scope.pay_rent = function () {
        console.log("pay rent");
        $state.go("rent_payment");
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
//# sourceMappingURL=controllers.js.map