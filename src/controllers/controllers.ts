angular.module('app.controllers', [ 'ionic', 'firebase'])

.controller('RoomiesCtrl', function($scope, Roomies, $ionicModal, $firebaseArray, Tenants, Storage) {

  var currentUserString = Storage.getData();
  var currentUser = JSON.parse(currentUserString);
  var tenants_ref = firebase.database().ref("Tenants/")
  $scope.roomies = $firebaseArray(tenants_ref);

  $ionicModal.fromTemplateUrl('templates/roomie-details.html', function(modal) {
          $scope.modalCtrl = modal;
      }, {
          scope: $scope,
          animation: 'slide-in-up',//'slide-left-right', 'slide-in-up', 'slide-right-left'
          focusFirstInput: false
  });

  $scope.openModal = function(roomie) {
    $scope.roomie = roomie;
    $scope.modalCtrl.show();
  };

  $scope.hideModal = function(){
    $scope.modalCtrl.hide();
  }

  $scope.add_to_favorites = function(roomie){
    Tenants.add_to_favorites(currentUser, roomie);
    $scope.hideModal();
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

  .controller('HousingCtrl', function($scope, $ionicModal, $firebaseArray, $cordovaGeolocation, $state, Storage, Properties) {

    var currentUserString = Storage.getData();
    var currentUser = JSON.parse(currentUserString);
    var property_ref = firebase.database().ref("Properties/");

    $scope.houses = $firebaseArray(property_ref);

    $ionicModal.fromTemplateUrl('templates/house-details.html', function(modal) {
            $scope.modalCtrl = modal;

        }, {
            scope: $scope,
            animation: 'slide-in-up',//'slide-left-right', 'slide-in-up', 'slide-right-left'
            focusFirstInput: false
          });

    $scope.openModal = function(house) {
      $scope.property = house;
      $scope.modalCtrl.show();

    };

    $scope.add_to_favorites = function(property){
      Properties.add_to_favorites(property, currentUser.id);
      $scope.hideModal();
    };

    $scope.hideModal = function(){
      $scope.modalCtrl.hide();
    }

    $scope.openMap = function(house){
      console.log("hello from map");
      $scope.map = { center: { latitude: house.lat, longitude: house.long }, zoom: 8 };
    };

    $scope.showFilter=true;
})

.controller('FavoritePropsCtrl', function($scope, $rootScope, Storage, $firebaseArray, $ionicModal, $location, $state, Properties) {

  var currentUserString = Storage.getData();
  var currentUser = JSON.parse(currentUserString);
  var previous_state;

  var property_ref = firebase.database().ref("Tenants/"+currentUser.id+"/fav_props/");

  $scope.fav_props = $firebaseArray(property_ref);

  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });

  $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
      previous_state = from.name;

      console.log(to.name);
      if(to.name == 'favorites'){
        $scope.is_favorites = true;
      }
      else{
        $scope.is_favorites = false;
      }

  });


  $ionicModal.fromTemplateUrl('templates/house-details.html', function(modal) {
          $scope.modalCtrl = modal;

      }, {
          scope: $scope,
          animation: 'slide-in-up',//'slide-left-right', 'slide-in-up', 'slide-right-left'
          focusFirstInput: false
        });

  $scope.openModal = function(house) {
    $scope.property = house;
    $scope.modalCtrl.show();
  };

  $scope.hideModal = function(){
    $scope.modalCtrl.hide();
  }

  $scope.goBack = function() {
    $state.go(previous_state);
  };

  $scope.apply_for_prop = function(property){
    Properties.apply(currentUser, property)
    $scope.hideModal();
  }

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

.controller('SideMenuCtrl', function($scope, $ionicSideMenuDelegate, $rootScope, Auth, $state, $firebaseObject) {


  // synchronize the object with a three-way data binding
  // click on `index.html` above to see it used in the DOM!
  $scope.logout = function(){
    Auth.$signOut().then(function(){
        $state.go('login');
    }, function(error){

    });
  }
  $scope.profile_pic = "img/terry-crews.jpg";

})

.controller("SignUpCtrl", function ($scope, $ionicModal, Auth, $log,$ionicLoading, firebase, $firebaseArray, $ionicPopup){

  $scope.createUser = function(signupForm){

    if (signupForm.$valid) {

        var email = $scope.user.email;
        var password = $scope.user.password;
        var first_name = $scope.user.firstName;
        var last_name = $scope.user.lastName;
        var phone_number = $scope.user.phone_number;
        var imageUrl = null;

        console.log("form submitted");

        if($scope.isChecked){
          $scope.modal.remove();
          $scope.uploadModal.show();

        Auth.$createUserWithEmailAndPassword(email, password)
            .then(function(newUser) {
              //$scope.message = "User created with uid: " + firebaseUser.uid;
              firebase.database().ref('Tenants/' + newUser.uid).set({
                first_name: first_name,
                last_name: last_name,
                email: email,
                profile_pic : imageUrl,
                phone_number: phone_number
              });;
              $scope.modal.remove();
              $scope.uploadModal.show();
            }).catch(function(error) {
              $ionicPopup.alert({
                title: 'Sign up error',
                template: error
              });
            });
        }else{
          $ionicPopup.alert({
            title: 'Sign up error',
            template: 'Please confirm that you are 18 years old or older'
          })
        }

      }
    }

    $scope.showLogin = function(){
      $scope.modal.hide();
    }


})

.controller('UploadCtrl', function($scope, $rootScope, $window, $cordovaImagePicker, $cordovaFile, $ionicPlatform, $q, $timeout){

  $scope.closeUpload = function(){
    $scope.uploadModal.hide();
  }

  function loadData() {

      firebase.database().ref('assets').on('value', function(_snapshot){

        // need to reset array each time
        var result = [];

        // loop through the snapshot to get the objects
        // to display in the list
        _snapshot.forEach( function(childSnapshot){
          // get key & data...
          // var element = Object.assign({ id: childSnapshot.key }, childSnapshot.val());
          var element = childSnapshot.val();
          element.id = childSnapshot.key;

          // add to array object
          result.push(element);
          return true;
        });

        // put the array on the $scope for display in the UI,
        // we will wrap it in a $timeout to ensure the screen is
        // updated
        $timeout(function () {
          $scope.assetCollection = result;
        }, 2);
      })
    }

    function saveReferenceInDatabase(_snapshot) {
      var ref = firebase.database().ref('assets');

      // see information in firebase documentation on storage snapshot and metaData
      var dataToSave =  {
        'URL': _snapshot.downloadURL, // url to access file
        'name': _snapshot.metadata.name, // name of the file
        'lastUpdated': new Date().getTime(),
      };

      return ref.push(dataToSave).catch(function(_error){
        alert("Error Saving to Assets " + _error.message);
      })
    }

    function saveToFirebase(_imageBlob, _filename) {

          return $q(function (resolve, reject) {
            // Create a root reference to the firebase storage
            var storageRef = firebase.storage().ref();

            // pass in the _filename, and save the _imageBlob
            var uploadTask = storageRef.child('images/' + _filename).put(_imageBlob);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed', function (snapshot) {
              // Observe state change events such as progress, pause, and resume
              // See below for more detail
            }, function (error) {
              // Handle unsuccessful uploads, alert with error message
              alert(error.message)
              reject(error)
            }, function () {
              // Handle successful uploads on complete
              var downloadURL = uploadTask.snapshot.downloadURL;

              // when done, pass back information on the saved image
              resolve(uploadTask.snapshot)
            });
        });
    }

    $scope.doGetImage = function () {
        var options = {
          maximumImagesCount: 1, // only pick one image
          width: 800,
          height: 800,
          quality: 80
        };

        var fileName, path;

        //$cordovaImagePicker.requestReadPermission();

        $cordovaImagePicker.getPictures(options)
          .then(function (results) {
            console.log('Image URI: ' + results[0]);

            // lets read the image into an array buffer..
            // see documentation:
            // http://ngcordova.com/docs/plugins/file/
            fileName = results[0].replace(/^.*[\\\/]/, '');

            // modify the image path when on Android
            if ($ionicPlatform.is("android")) {
              path = cordova.file.cacheDirectory
            } else {
              path = cordova.file.tempDirectory
            }

            return $cordovaFile.readAsArrayBuffer(path, fileName);
          }).then(function (success) {
            // success - get blob data
            var imageBlob = new Blob([success], { type: "image/jpeg" });

            // missed some params... NOW it is a promise!!
            return saveToFirebase(imageBlob, fileName);
          }).then(function (_responseSnapshot) {
            // we have the information on the image we saved, now
            // let's save it in the realtime database
            return saveReferenceInDatabase(_responseSnapshot)
          }).then(function (_response) {
            alert("Saved Successfully!!")
          }, function (error) {
            // error
            console.log(error)
          })

        }
})
.controller('LoginCtrl',  function ($scope, $ionicModal, $state, $log, Auth, $ionicPlatform,
   $cordovaFacebook, $ionicLoading, Storage, $firebaseObject) {

  $scope.fbLogin = function () {
    $cordovaFacebook.getLoginStatus();
    $cordovaFacebook.login(["public_profile", "email", "user_friends"])
    .then(function(success) {
      // { id: "634565435",
      //   lastName: "bob"
      //   ...
      // }
      alert(success.first_name);
      $state.go('tab.roomies');
    }, function (error) {
      $log.log("fuck my life");
    });
    $scope.image_src = 'img/homeas.jpg';
  };

  $scope.signup_img = 'img/modern_living.jpg';

  $scope.gotoMain = function() {
    $state.go("tab.roomies");
  };

  $ionicModal.fromTemplateUrl('templates/signup.html', {
      scope: $scope
  }).then(function (modal) {
      $scope.modal = modal;
  });

  $ionicModal.fromTemplateUrl('templates/upload-image.html', function(modal) {
           $scope.uploadModal = modal;
       }, {
           scope: $scope,
           animation: 'slide-in-up',//'slide-left-right', 'slide-in-up', 'slide-right-left'
           focusFirstInput: false
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
              var id = authData.uid;
              var ref = firebase.database().ref('/Tenants/' + authData.uid);
              var obj = $firebaseObject(ref);
              obj.$loaded().then(function() {
                var user = {
                  'id': id,
                  'first_name': obj.first_name,
                  'last_name': obj.last_name,
                  'email': obj.email,
                  "phone_number": obj.phone_number
                };

                Storage.setData(JSON.stringify(user));

               });
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
