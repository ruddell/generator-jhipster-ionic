'use strict';
angular.module('main')
    .controller('HomeCtrl', function ($log, $rootScope, Auth, $state, Principal, LoginService) {
        var vm = this;
        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.logout = logout;
        vm.register = register;
        $rootScope.$on('authenticationSuccess', function() {
            getAccount();
        });

        getAccount();

        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
            });
        }
        function register () {
            $state.go('register');
        }

        function logout () {
            Auth.logout();
            $state.go('home');
        }
    });
