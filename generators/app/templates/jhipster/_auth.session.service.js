(function() {
    'use strict';

    angular
        .module('main')
        .factory('AuthServerProvider', AuthServerProvider);

    AuthServerProvider.$inject = ['$http', '$localStorage', 'Config'<% if (enableWebsocket) { %>, 'JhiTrackerService'<% } %>];

    function AuthServerProvider ($http, $localStorage, Config<% if (enableWebsocket) { %>, JhiTrackerService<% } %>) {
        var service = {
            getToken: getToken,
            hasValidToken: hasValidToken,
            login: login,
            logout: logout
        };

        return service;

        function getToken () {
            var token = $localStorage.authenticationToken;
            return token;
        }

        function hasValidToken () {
            var token = this.getToken();
            return !!token;
        }

        function login (credentials) {
            var data = 'j_username=' + encodeURIComponent(credentials.username) +
                '&j_password=' + encodeURIComponent(credentials.password) +
                '&remember-me=' + credentials.rememberMe + '&submit=Login';

            return $http.post(Config.ENV.SERVER_URL + 'api/authentication', data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function (response) {
                return response;
            });
        }

        function logout () {<% if (enableWebsocket) { %>
            JhiTrackerService.disconnect();<% } %>
            // logout from the server
            $http.post(Config.ENV.SERVER_URL + 'api/logout').success(function (response) {
                delete $localStorage.authenticationToken;
                // to get a new csrf token call the api
                $http.get(Config.ENV.SERVER_URL + 'api/account');
                return response;
            });

        }
    }
})();
