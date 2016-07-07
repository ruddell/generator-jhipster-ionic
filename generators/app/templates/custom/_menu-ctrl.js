'use strict';
angular.module('main')
    .controller('MenuCtrl', function ($log, Auth, $state, Principal, LoginService) {
        var vm = this;
        vm.login = LoginService.open;
        vm.isAuthenticated = Principal.isAuthenticated;
        vm.logout = logout;

        function logout () {
            Auth.logout();
            $state.go('home');
        }

    });
