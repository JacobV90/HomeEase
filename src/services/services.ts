
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
.factory("Tenants", function($firebaseArray){
  return {
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
            picture: tenant.picture
        });
      }
  }
});
