/// <reference path="../../typings/tsd.d.ts" />

angular.module('app.controllers', [])

  .controller('LoginCtrl',['$scope','$log', 'facebookService', function($scope, $log, facebookService){

    $scope.data = facebookService.getUserInfo();
    $scope.output = function(){
      $log.log("hello from button");
    };

  }]);
