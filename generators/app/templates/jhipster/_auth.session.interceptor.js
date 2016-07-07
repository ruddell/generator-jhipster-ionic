(function() {
    'use strict';

    angular
        .module('main')
        .factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['$rootScope', '$q', '$location', '$localStorage', '$sessionStorage'];

    function authInterceptor ($rootScope, $q, $location, $localStorage, $sessionStorage) {
        var service = {
            request: request
        };

        return service;

        function request (config) {
            /*jshint camelcase: false */
            config.headers = config.headers || {};
            var token = $localStorage['X-CSRF-TOKEN'];
            if (token) {
                config.headers['X-CSRF-TOKEN'] = token;
            }

            return config;
        }
    }
})();
