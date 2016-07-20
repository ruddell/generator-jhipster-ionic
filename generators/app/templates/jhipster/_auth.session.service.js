(function() {
    'use strict';

    angular
        .module('main')
        .factory('AuthServerProvider', AuthServerProvider);

    AuthServerProvider.$inject = ['$http', '$localStorage', '$ionicHistory', 'Config'<% if (enableWebsocket) { %>, 'JhiTrackerService'<% } %>];

    function AuthServerProvider ($http, $localStorage, $ionicHistory, Config<% if (enableWebsocket) { %>, JhiTrackerService<% } %>) {
        var numError = 0;
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
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            var data = 'j_username=' + encodeURIComponent(credentials.username) +
                '&j_password=' + encodeURIComponent(credentials.password) +
                '&remember-me=' + credentials.rememberMe + '&submit=Login';

            return $http.post(Config.ENV.SERVER_URL + 'api/authentication', data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function (response) {
                numError = 0;
                $http.post(Config.ENV.SERVER_URL + 'api/account').error(function (data, code, headers) {
                    $localStorage['X-CSRF-TOKEN'] = headers('x-csrf-token-ionic');
                });
                return response;
            }).error(function (error, code, headers) {
                numError += 1;
                $localStorage['X-CSRF-TOKEN'] = headers('x-csrf-token-ionic');
                if (numError < 2) {
                    login(credentials);
                }
            });
        }

        function logout () {<% if (enableWebsocket) { %>
            JhiTrackerService.disconnect();<% } %>
            // logout from the server
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            $http.post(Config.ENV.SERVER_URL + 'api/logout')
                .success(function (response) {
                    // to get a new csrf token call the api
                    $http.post(Config.ENV.SERVER_URL + 'api/account').error(function (data, code, headers) {
                        $localStorage['X-CSRF-TOKEN'] = headers('x-csrf-token-ionic');
                    });
                    return response;
                });

        }
    }
})();
