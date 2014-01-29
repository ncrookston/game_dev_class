(function() {
'use strict'

var game1 = angular.module('cs_game', ['nrc_game'])

  .controller('game_control', function($scope, game_loop) {

      $scope.fps = 0;
      $scope.messages = [];

      var timers = [];
      var numVisits = 0;
      var startTime = performance.now();

      $scope.onMessageTime = function(message) {
        return message.displayTime <= $scope.currTime;
      };

      $scope.addTimer = function() {
        timers.push($scope.timer);
      };

      var input = function() {
        //Naught here, yet.  Perhaps addTimer should be tied in somehow?
      };

      var update = function(currTime) {

        $scope.currTime = currTime;
        numVisits++;

        $scope.fps = numVisits
          / ((currTime - startTime) / 1000);

        timers.forEach(function(timer) {
          for (var i = 0; i < timer.repeat_count; i++) {
            $scope.messages.push(
            {
              name: timer.name,
              displayTime: currTime + timer.repeat_interval * 1000 * i,
              remaining: timer.repeat_count - i
            });
          }
        });
        timers.length = 0;
      };

      //Once input has substance then generate a function which calls it first.
      game_loop(update);
    });
})();

