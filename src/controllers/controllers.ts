/// <reference path="../../typings/tsd.d.ts" />

angular.module('app.controllers', [ 'ionic'])

  .controller('RoomiesCtrl', function($scope, Roomies, $ionicModal) {
    $scope.roomies = Roomies.all();
    $scope.remove = function(roomie) {
      Roomies.remove(roomie);
    };

    $ionicModal.fromTemplateUrl('templates/modal.html', function(modal) {
          $scope.modalCtrl = modal;
      }, {
          scope: $scope,
          animation: 'slide-in-up',//'slide-left-right', 'slide-in-up', 'slide-right-left'
          focusFirstInput: false
        });

  $scope.openModal = function(roomie) {
    $scope.modalData = {"name": roomie.name, "img":roomie.face};
    $scope.modalCtrl.show();
  };

  $scope.hideModal = function(){
    $scope.modalCtrl.hide();
  }

  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
})

  .controller('ModalCtrl', function($scope, $ionicActionSheet) {

        $scope.hideModal = function() {
          $scope.modalCtrl.hide();
        };
        $scope.removeModal = function() {
          $scope.modal.remove();
        };
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

.controller('SideMenuCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.name = "Demo User";
  $scope.profile_pic = "img/terry-crews.jpg";
})


.controller('LoginCtrl',  function ($scope, $ionicModal, $state, $log, $ionicPlatform,  $cordovaFacebook) {

  $scope.fbLogin = function () {

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
  };
});
