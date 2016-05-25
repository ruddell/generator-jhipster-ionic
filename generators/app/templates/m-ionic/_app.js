'use strict';
angular.module('<%= angularAppBaseName %>', [
  // load your modules here
  'main', // starting with the main module
]).run(run);
run.$inject = ['stateHandler'<% if (enableTranslation) { %>, 'translationHandler'<% } %>];

function run(stateHandler<% if (enableTranslation) { %>, translationHandler<% } %>) {
  stateHandler.initialize();<% if (enableTranslation) { %>
  translationHandler.initialize();<% } %>
}
