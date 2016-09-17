/// <reference path="../typings/tsd.d.ts" />
angular.module('starter.controllers', [])

  .controller('DashCtrl', function($scope, $ionicLoading) {
    $ionicLoading
  })

  .controller('ChatsCtrl', function(Chats) {
  this.chats = Chats.all();
  this.remove = function(chat) {
    Chats.remove(chat);
  };
})

  .controller('ChatDetailCtrl', function($stateParams, Chats) {
  this.chat = Chats.get($stateParams.chatId);
})

  .controller('AccountCtrl', function() {
  this.settings = {
    enableFriends: true
  };
});
