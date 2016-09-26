/// <reference path="../../typings/tsd.d.ts" />

angular.module('app.controllers', [ 'ngOpenFB'])

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

.controller('LoginCtrl', function ($scope, $ionicModal, $state, $timeout, ngFB) {
  $scope.fbLogin = function () {
    ngFB.login({scope: 'email,publish_actions'}).then(
        function (response) {
            if (response.status === 'connected') {
                console.log('Facebook login succeeded');
                //$scope.closeLogin();
                $state.go('tab.roomies');
            } else {
                alert('Facebook login failed');
            }
        });
    };

    $scope.image_src = 'img/homeas.jpg';
});
