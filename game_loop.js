(function() {
'use strict'

var game1 = angular.module('nrc_game', [])
  .factory('game_loop', function($window, $rootScope) {
      return function game_loop(single_turn) {
        $window.requestAnimationFrame(function(time) {
          $rootScope.$apply(function() {
            single_turn(time);
            game_loop(single_turn);
          });
        });
      };
    });
})();

