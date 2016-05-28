(function() {
    'use strict';

    angular
        .module('main')
        .factory('ProfileService', ProfileService);

    ProfileService.$inject = ['$q', '$http', 'Config'];

    function ProfileService($q, $http, Config) {

        var dataPromise;

        var service = {
            getProfileInfo : getProfileInfo
        };

        return service;

        function getProfileInfo() {
            if (angular.isUndefined(dataPromise)) {
                dataPromise = $http.get(Config.ENV.SERVER_URL + 'api/profile-info').then(function(result) {
                    if (result.data.activeProfiles) {
                        var response = {};
                        response.activeProfiles = result.data.activeProfiles;
                        response.ribbonEnv = result.data.ribbonEnv;
                        response.inProduction = result.data.activeProfiles.indexOf("prod") !== -1;
                        response.swaggerDisabled = result.data.activeProfiles.indexOf("no-swagger") !== -1;
                        return response;
                    }
                });
            }
            return dataPromise;
        }
    }
})();
