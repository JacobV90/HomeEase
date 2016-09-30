/// <reference path="../../typings/tsd.d.ts" />

angular.module('app.controllers', [ 'ionic'])

  .controller('RoomiesCtrl', function($scope, $ionicLoading) {
    $ionicLoading
  })

  .controller('HousingCtrl', function($scope) {
    $scope.houses = [
      {
        "id":1,
        "streetAddress":"3426 Christie Way",
        "city":"Bedford",
        "state":"MA",
        "zipCode":"1730",
        "country":"United States",
        "email":"ErnestoJTheroux@dayrep.com",
        "latitude":"42.418043",
        "longitude":"-71.346313",
        "image":"http://s1.postimg.org/j5mytq3iz/profile.jpg",
        "discription":"",
        "price":10000,
        "bedrooms":"",
        "bathrooms":""
      },
      {
        "id":2,
        "streetAddress":"3426 Christie Way",
        "city":"Bedford",
        "state":"MA",
        "zipCode":"1730",
        "country":"United States",
        "email":"ErnestoJTheroux@dayrep.com",
        "latitude":"42.418043",
        "longitude":"-71.346313",
        "image":"http://s1.postimg.org/j5mytq3iz/profile.jpg",
        "discription":"",
        "price":7000,
        "bedrooms":"",
        "bathrooms":""
      }];
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

.controller('LoginCtrl',  function ($scope, $ionicModal, $state, $log, $ionicPlatform,  $cordovaFacebook) {
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
