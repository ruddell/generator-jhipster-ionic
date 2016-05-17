'use strict';
angular.module('<%= angularAppName %>', [
  // load your modules here
  'main', // starting with the main module
  'ui.bootstrap',
  'ngResource',
  'ngCookies',
  'ngStorage',
  'infinite-scroll'
]).run(run);
run.$inject = ['stateHandler'];

function run (stateHandler) {
  stateHandler.initialize();
}
