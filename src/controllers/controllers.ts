/// <reference path="../../typings/tsd.d.ts" />

angular.module('app.controllers', [])

  .controller('RoomiesCtrl', function($scope, $ionicLoading) {
    $ionicLoading
  })

  .controller('HousingCtrl', function(Chats) {
  this.chats = Chats.all();
  this.remove = function(chat) {
    Chats.remove(chat);
  };
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
});
