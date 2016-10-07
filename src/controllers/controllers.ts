angular.module('app.controllers', [ 'ionic', 'firebase'])

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

.controller('SideMenuCtrl', function($scope, $ionicSideMenuDelegate, Auth, $state) {

  $scope.logout = function(){
    Auth.$signOut().then(function(){
        $state.go('login');
    }, function(error){

    });

  }
  $scope.profile_pic = "img/terry-crews.jpg";
})

.controller("SignUpCtrl", function ($scope, $ionicModal, Auth, $log,$ionicLoading, $rootScope){

  $scope.createUser = function (user) {
      console.log("Create User Function called");
      $scope.message = null;
      $scope.error = null;

      // Create a new user
      Auth.$createUserWithEmailAndPassword($scope.email, $scope.password)
        .then(function(firebaseUser) {
          $scope.message = "User created with uid: " + firebaseUser.uid;
          $scope.modal.destroy();
        }).catch(function(error) {
          $scope.error = error;
        });
    };

    $scope.showLogin = function(){
      $scope.modal.hide();
    }

})


.controller('LoginCtrl',  function ($scope, $ionicModal, $state, $log, Auth, $ionicPlatform, $cordovaFacebook, $ionicLoading, $rootScope) {

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

  $ionicModal.fromTemplateUrl('templates/signup.html', {
      scope: $scope
  }).then(function (modal) {
      $scope.modal = modal;
  });

  $scope.signup = function(){
    $scope.modal.show();
  };

  $scope.signIn = function () {

      if ($scope.email && $scope.pwdForLogin) {
          $ionicLoading.show({
              template: 'Signing In...'
          });
          Auth.$signInWithEmailAndPassword($scope.email,$scope.pwdForLogin)
          .then(function (authData) {
              console.log("Logged in as:" + authData.uid);
              $rootScope.user = authData.uid;
              $ionicLoading.hide();
              $state.go('tab.roomies');
          }).catch(function (error) {
              alert("Authentication failed:" + error.message);
              $ionicLoading.hide();
          });
      } else
          alert("Please enter email and password both");
  }
});
