'use strict';
angular.module('main')
  .controller('HomeCtrl', function ($log, Auth, $state, Principal, LoginService) {
    var vm = this;
    vm.login = LoginService.open;
    vm.isAuthenticated = Principal.isAuthenticated;
    vm.logout = logout;
    vm.login = LoginService.open;
    function logout () {
      Auth.logout();
      $state.go('main.home');
    }

  });
