/// <reference path="../../typings/tsd.d.ts" />

angular.module('app.services', [])

.factory('facebookService', function($q) {
    return {
        getUserInfo: function() {
          FB.api(
            '/me',
            'GET',
            {"fields":"email,birthday,education,name,work"},
            function(response) {
              return response
            }
          );
        }
    }
});
