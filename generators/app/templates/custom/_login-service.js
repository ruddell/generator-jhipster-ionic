'use strict';

angular
    .module('main')
    .factory('LoginService', LoginService);

LoginService.$inject = ['$state'];

function LoginService ($state) {


    var service = {
        open: open
    };

    return service;

    function open () {
        $state.go('login');
    }
}
