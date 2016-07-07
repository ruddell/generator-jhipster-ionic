(function() {
    'use strict';

    angular
        .module('main')
        .factory('Account', Account);

    Account.$inject = ['$resource', '$localStorage'];

    function Account ($resource, $localStorage) {
        var service = $resource(Config.ENV.SERVER_URL + 'api/account', {}, {
            'get': { method: 'GET', params: {}, isArray: false,
                interceptor: {
                    response: function(response) {
                        // expose response
                        $localStorage['X-CSRF-TOKEN'] = response.headers('X-CSRF-TOKEN-IONIC');
                        return response;
                    }
                }
            }
        });

        return service;
    }
})();
