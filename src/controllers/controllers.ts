angular.module('app.controllers', [ 'ionic', 'firebase'])

.controller('AboutCtrl', function($scope){

})

.controller('RoomiesCtrl', function($scope, Roomies, $ionicModal, $firebaseArray, Tenants, Storage) {

  var currentUser = Storage.getData('user');
  var tenants_ref = firebase.database().ref("Tenants/")
  var roomies = $firebaseArray(tenants_ref);

  //remove current user from room mate listing
  roomies.$loaded().then(function() {
    for(var i = 0; i < roomies.length; ++i){
      if(roomies[i].email == currentUser.email){
        roomies.splice(i, 1);
      }
    }
    $scope.roomies = roomies;
  });

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
    console.log(roomie);
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

    var currentUser = Storage.getData('user');
    var property_ref = firebase.database().ref("Properties/");

    $scope.houses = $firebaseArray(property_ref);

    $ionicModal.fromTemplateUrl('templates/home-details.html', function(modal) {
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
      Properties.add_to_favorites(property, currentUser.tenant_id);
      $scope.hideModal();
    };

    $scope.hideModal = function(){
      $scope.modalCtrl.hide();
    }

    $scope.openMap = function(house){
      $scope.map = { center: { latitude: house.lat, longitude: house.long }, zoom: 8 };
    };

    $scope.showFilter=true;
})

.controller('FavoritesCtrl', function($scope, $rootScope, Storage, $firebaseArray, $ionicModal, $location, $state, Properties) {

  var currentUser = Storage.getData('user');
  var previous_state;

  var fav_prop_ref = firebase.database().ref("Tenants/"+currentUser.tenant_id+"/fav_props/");
  var fav_roomie_ref = firebase.database().ref("Tenants/"+currentUser.tenant_id+"/fav_roomies/");
  $scope.fav_props = $firebaseArray(fav_prop_ref);
  $scope.fav_roomies = $firebaseArray(fav_roomie_ref);

  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });

  $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
      previous_state = from.name;

      if(to.name == 'favs.homes' || to.name == 'favs.roomies'){
        $scope.is_favorites = true;
      }
      else{
        $scope.is_favorites = false;
      }

  });

  $ionicModal.fromTemplateUrl('templates/roomie-details.html', function(modal) {
          $scope.roomieDetailsCtrl = modal;

      }, {
          scope: $scope,
          animation: 'slide-in-up',//'slide-left-right', 'slide-in-up', 'slide-right-left'
          focusFirstInput: false
  });

  $ionicModal.fromTemplateUrl('templates/home-details.html', function(modal) {
          $scope.homeDetailsCtrl = modal;

      }, {
          scope: $scope,
          animation: 'slide-in-up',//'slide-left-right', 'slide-in-up', 'slide-right-left'
          focusFirstInput: false
  });


  $scope.viewHome = function(house) {
    $scope.property = house;
    $scope.homeDetailsCtrl.show();
  };

  $scope.hideHome = function(){
    $scope.homeDetailsCtrl.hide();
  }

  $scope.viewRoomie = function(roomie) {
    $scope.roomie = roomie;
    $scope.roomieDetailsCtrl.show();
  };

  $scope.hideRoomie = function(){
    $scope.roomieDetailsCtrl.hide();
  }

  $scope.goBack = function() {
    $state.go("tab.housing");
  };

  $scope.apply_for_prop = function(property){

    console.log(currentUser.tenant_id + "is appling for a prop");
    Properties.apply(currentUser, property)
    $scope.hideHome();
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

.controller('MenuCtrl', function($scope, $rootScope, Auth, $state, Storage, $window) {

  var currentUser = Storage.getData('user');

  if (currentUser != null){
    $scope.first_name = currentUser.first_name;
    $scope.last_name = currentUser.last_name;
    $scope.email = currentUser.email;
  }

  $scope.logout = function(){
    Auth.$signOut().then(function(){
        Storage.clearData('user');
        $window.location.reload(true)
        $state.go('login');
    }, function(error){

    });
  }
  $scope.profile_pic = $rootScope.profile_pic;

  $scope.go_to_favs = function(){
    $state.go('favs.homes');
  }

})

.controller("SignUpCtrl", function ($scope, $ionicModal, Auth, $log,$ionicLoading, firebase, $firebaseArray, $ionicPopup, Tenants){

  $scope.createUser = function(signupForm){

    if (signupForm.$valid) {

        var email = $scope.user.email;
        var password = $scope.user.password;
        var first_name = $scope.user.firstName;
        var last_name = $scope.user.lastName;
        var phone_number = $scope.user.phone_number;
        var image_url = "";

        if(image_url == ""){
          image_url = "https://firebasestorage.googleapis.com/v0/b/home-ease.appspot.com/o/images%2Fdefault_avatar.png?alt=media&token=b03e9544-42fa-4029-8065-aa774ac0113e";
        }

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
                profile_pic : image_url,
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
.controller('LoginCtrl',  function ($scope, $rootScope,$ionicModal, $state, $log, Auth, $ionicPlatform,
   $cordovaFacebook, $ionicLoading, Storage, $firebaseObject, Tenants) {

     $scope.fbLogin = function () {

      $cordovaFacebook.login(["public_profile", "email", "user_friends"])
      .then(function(success) {
        console.log("facebook login success: " + success.authResponse.userID);
      }, function (error) {
        alert(error)
      });

      $cordovaFacebook.api('me?fields=id,first_name,last_name,picture,email', ["public_profile"]).then(function(response){
        console.log("hello from facebook")
        if (response && !response.error) {
          console.log(response.first_name);
          var user = {
            'tenant_id': response.id,
            'first_name': response.first_name,
            'last_name': response.last_name,
            'email': response.email,
            'phone_number': "",
            'picture': response.picture.data.url
          }
          console.log(JSON.stringify(user));
          Tenants.add_to_firebase(user);
          Storage.setData('user', user);
          $rootScope.profile_pic = response.picture.data.url;
          $state.go('tab.roomies');
        }
    }, function(error){
      alert(error);
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
                  'tenant_id': id,
                  'first_name': obj.first_name,
                  'last_name': obj.last_name,
                  'email': obj.email,
                  "phone_number": obj.phone_number,
                  "picture": obj.picture
                };
                Storage.setData('user', user);
                $ionicLoading.hide();
                $state.go('menu.search.homes');
               });
          }).catch(function (error) {
              alert("Authentication failed:" + error.message);
              $ionicLoading.hide();
          });
      } else
          alert("Please enter email and password both");
  }
});
