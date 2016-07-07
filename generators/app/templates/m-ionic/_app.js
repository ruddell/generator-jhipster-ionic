'use strict';
angular.module('<%= angularAppBaseName %>', [
    // load your modules here
    'main', // starting with the main module
]).run(run);
run.$inject = ['stateHandler'<% if (enableTranslation) { %>, 'translationHandler'<% } %><% if (authenticationType === 'session') { %>, '$http', '$localStorage'<% } %>];

function run(stateHandler<% if (enableTranslation) { %>, translationHandler<% } %><% if (authenticationType === 'session') { %>, $http, $localStorage<% } %>) {
    stateHandler.initialize();<% if (enableTranslation) { %>
        translationHandler.initialize();<% } %><% if (authenticationType === 'session') { %>
        $http.defaults.headers.post['X-CSRF-TOKEN'] = $localStorage['X-CSRF-TOKEN'];<% } %>
}
