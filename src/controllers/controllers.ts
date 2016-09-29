/// <reference path="../../typings/tsd.d.ts" />

angular.module('app.controllers', [ 'ngOpenFB', 'ionic'])

  .controller('RoomiesCtrl', function($scope, $ionicLoading) {
    $ionicLoading
  })

  .controller('HousingCtrl', function() {

})

  .controller('MoneyCtrl', function() {
  this.settings = {
    enableFriends: true
  };
})

.controller('InfoCtrl', function() {
this.settings = {
  enableFriends: true
  };
})

.controller('SideMenu', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };
})

.controller('LoginCtrl',  function ($scope, $ionicModal, $state, $log, $ionicPlatform, ngFB, $cordovaFacebook) {
  $scope.fbLogin = function () {

    $log.log("fblogin called");
    $cordovaFacebook.getLoginStatus();

    $cordovaFacebook.login(["public_profile", "email", "user_friends"])
    .then(function(success) {
      // { id: "634565435",
      //   lastName: "bob"
      //   ...
      // }
      $state.go('tab.roomies');
    }, function (error) {
      $log.log("fuck my life");
    });
    $scope.image_src = 'img/homeas.jpg';
  };

  $scope.gotoMain = function() {
    $state.go("tab.roomies");
  }
});
