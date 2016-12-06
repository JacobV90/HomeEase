
angular.module('app.services', ['firebase'])

.factory("Auth", ["$firebaseAuth", "$rootScope",
         function ($firebaseAuth) {
            return $firebaseAuth();
}])
.factory("Storage", function($window, $rootScope) {
  angular.element($window).on('storage', function(event) {
    if (event.key === 'user') {
      $rootScope.$apply();
    }
  });
  return {
    setData: function(entry, val) {
      $window.localStorage.setItem(entry, JSON.stringify(val));
      return this;
    },
    getData: function(entry) {
      return JSON.parse($window.localStorage.getItem(entry));
    },
    clearData: function(entry){
      $window.localStorage.removeItem(entry);
      console.log($window.localStorage.getItem(entry));
      return this
    }
  };
})
.factory("Properties", function($firebaseArray){
  return {
    add_to_favorites: function(property, tenant_id){
      firebase.database().ref("Tenants/"+tenant_id+"/fav_props/"+property.prop_id+"/").set({
          street: property.street,
          city: property.city,
          state: property.street,
          bathrooms: property.bathrooms,
          bedrooms: property.bedrooms,
          amenities: property.amenities,
          description: property.description,
          price: property.price,
          owner: property.owner,
          zipcode: property.zipcode,
          prop_id: property.prop_id,
          lat: property.lat,
          long: property.long,
      });
    },
    apply: function(tenant, property){
      firebase.database().ref("Owners/"+property.owner.owner_id
        +"/properties/"+property.prop_id+"/Applicants/"+tenant.tenant_id+'/').set({
        tenant_id: tenant.tenant_id,
        first_name: tenant.first_name,
        last_name: tenant.last_name,
        email: tenant.email,
        phone_number: tenant.phone_number,
        picture: tenant.picture
      });
    }
  }
})
.factory("Tenants", function($firebaseArray, $firebaseObject, Storage, $state){
  var currentUser = Storage.getData('user');
  return {
      current_user: function(){
        var ref = firebase.database().ref("Tenants/"+currentUser.tenant_id);
        return $firebaseArray(ref);
      },
      add_to_favorites: function(tenant, roomie){
        firebase.database().ref("Tenants/"+tenant.tenant_id
          +"/fav_roomies/"+roomie.$id+"/").update({
            tenant_id: roomie.$id,
            first_name: roomie.first_name,
            last_name: roomie.last_name,
            email: roomie.email,
            phone_number: roomie.phone_number,
            picture: roomie.picture
        });
      },
      add_to_firebase: function(tenant){
        firebase.database().ref("Tenants/"+tenant.tenant_id+"/").update({
            tenant_id: tenant.tenant_id,
            first_name: tenant.first_name,
            last_name: tenant.last_name,
            email: tenant.email,
            phone_number: tenant.phone_number,
            picture: tenant.picture,
            chatrooms: 0
        });
      },
      add_chatroom: function(tenant, chatroom_id){
        var ref= firebase.database().ref("Tenants/"+tenant.tenant_id+'/chatrooms');
        var user = $firebaseArray(ref);
        console.log("tenants chatrooms")
        var room_index;
        user.$add({id: chatroom_id}).then(function(ref){
          console.log("chatroom: " + chatroom_id+" added to tenant: "+tenant.tenant_id);
          $state.reload();
        },function(){
          console.log("chatroom firebase error")
        })
      },
      add_chatroom_message: function(chatroom_id, message){
        firebase.database().ref("Tenants/"+currentUser.tenant_id+"/chatrooms/"+chatroom_id).update({
            message: message.text,
            from: message.from,
            to: message.to,
            created: message.created
        });
      }
  }
})
.factory('Chats', function ($firebaseArray, Rooms) {

var selectedRoomId;

var ref = firebase.database().ref('/Chatrooms');
var chats = $firebaseArray(ref);

return {
    all: function () {
        return chats;
    },
    remove: function (chat) {
        chats.$remove(chat).then(function (ref) {
            ref.key() === chat.$id; // true item has been removed
        });
    },
    get: function (chatId) {
        for (var i = 0; i < chats.length; i++) {
            if (chats[i].id === parseInt(chatId)) {
                return chats[i];
            }
        }
        return null;
    },
    getSelectedRoomName: function () {
        var selectedRoom;
        if (selectedRoomId && selectedRoomId != null) {
            selectedRoom = Rooms.get(selectedRoomId);
            if (selectedRoom)
                return selectedRoom.name;
            else
                return null;
        } else
            return null;
    },
    selectMessages: function (roomId) {
        console.log("selecting the room with id: " + roomId);
        selectedRoomId = roomId;
        if (roomId != null || roomId != undefined) {
            return $firebaseArray(ref.child(selectedRoomId).child('messages'));
        }
    },
    send: function (from, message) {
        console.log("sending message from: " + from+ " & message is " + message);
        var messages = $firebaseArray(ref.child(selectedRoomId).child('messages'));
        if (from && message) {
            var d = new Date();
            var time = d.getTime();
            var chat = {
                from: from,
                text: message,
                createdAt: time
            };
            messages.$add(chat).then(function (data) {
                console.log("message added");
            });
        }
    }
}
})
.factory('Rooms', function ($firebaseArray, Storage, Tenants) {
    // Might use a resource here that returns a JSON array
 var rooms_ref = firebase.database().ref('/Chatrooms');
 var rooms = $firebaseArray(rooms_ref);
 var currentUser = Storage.getData('user');

return {
   all: function () {
       return rooms;
   },
   get: function (roomId) {
       // Simple index lookup
       return rooms.$getRecord(roomId);
   },
   add: function(chatroom){
     rooms.$add(chatroom).then(function (data) {
         var id = data.key;
         for(var i =0; i < chatroom.members.length; ++i){
           console.log(data)
           Tenants.add_chatroom(chatroom.members[i], id);
           console.log("room added for " + chatroom.members[i].email);
         }
     }, function(){
       console.log("chat room firebase error");
     });
   }
}
});
