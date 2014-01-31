(function() {
'use strict'

var game1 = angular.module('cs_game', ['nrc_game'])

  .controller('game_control', function($scope, game_loop) {

      $scope.fps = 0;
      $scope.messages = [];

      var timers = [];
      var unreadyMsgs = [];
      var numVisits = 0;
      var startTime = performance.now();

      $scope.addTimer = function() {
        timers.push($scope.timer);
        //Clear out the model, so setPristine blanks everything out.
        $scope.timer = undefined;
        $scope.timer_form.$setPristine();
      };

      var input = function() {
        //Naught here, yet.  Perhaps addTimer should be tied in somehow?
      };

      var update = function(currTime) {

        numVisits++;

        $scope.fps = numVisits
          / ((currTime - startTime) / 1000);

        timers.forEach(function(timer) {
          for (var i = 0; i < timer.repeat_count; i++) {
            unreadyMsgs.push(
            {
              name: timer.name,
              displayTime: currTime + timer.repeat_interval * 1000 * i,
              remaining: timer.repeat_count - 1 - i
            });
          }
        });
        timers.length = 0;

        function isReadyTime(msg) { return msg.displayTime <= currTime; };

        [].push.apply($scope.messages, unreadyMsgs.filter(isReadyTime));

        unreadyMsgs = unreadyMsgs.filter(
            function(msg) { return !isReadyTime(msg); });
      };

      //Once input has substance then generate a function which calls it first.
      game_loop(update);
    });
})();

