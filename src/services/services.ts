
angular.module('app.services', ['firebase'])

.factory('Roomies', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var roomies = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, its me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return roomies;
    },
    remove: function(roomie) {
      roomies.splice(roomies.indexOf(roomie), 1);
    },
    get: function(roomieId) {
      for (var i = 0; i < roomies.length; i++) {
        if (roomies[i].id === parseInt(roomieId)) {
          return roomies[i];
        }
      }
      return null;
    }
  };
})
.factory("Auth", ["$firebaseAuth", "$rootScope",
         function ($firebaseAuth) {
            return $firebaseAuth();
    }]);
