'use strict';

angular
    .module('main')
    .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$log', '$ionicHistory', '$scope', '$rootScope', '$window', '$state', '$timeout', 'Auth', '$ionicModal'];

function LoginCtrl ($log, $ionicHistory, $scope, $rootScope, $window, $state, $timeout, Auth, $ionicModal) {
    var vm = this;

    vm.authenticationError = false;
    vm.credentials = {};
    vm.cancel = cancel;
    vm.login = login;
    vm.hideModal = hideModal;
    vm.register = register;
    vm.requestResetPassword = requestResetPassword;
    vm.password = null;
    vm.rememberMe = true;
    vm.username = null;

    function hideModal () {
        vm.modal.hide();
        $state.go('home');
    }
    // $timeout(function () {angular.element('#username').focus();});

    function cancel () {
        vm.credentials = {
            username: null,
            password: null,
            rememberMe: true
        };
        vm.authenticationError = false;
    }

    function login (event) {
        event.preventDefault();
        Auth.login({
            username: vm.username,
            password: vm.password,
            rememberMe: vm.rememberMe
        }).then(function () {
            vm.authenticationError = false;
            vm.hideModal();
            if ($state.current.name === 'register' || $state.current.name === 'activate' ||
                $state.current.name === 'finishReset' || $state.current.name === 'requestReset') {
                $state.go('home');
            }

            // If we're redirected to login, our
            // previousState is already set in the authExpiredInterceptor. When login succesful go to stored state
            if ($rootScope.redirected && $rootScope.previousStateName) {
                $state.go($rootScope.previousStateName, $rootScope.previousStateParams);
                $rootScope.redirected = false;
            } else {
                $rootScope.$broadcast('authenticationSuccess');
            }
        }).catch(function () {
            vm.authenticationError = true;
        });
    }

    function register () {
        vm.hideModal();
        $state.go('register');
    }

    function requestResetPassword () {
        vm.hideModal();
        $state.go('requestReset');
    }

    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        if (toState.name == "login"){
            $ionicModal.fromTemplateUrl('main/templates/login.html', {
                scope: $scope
            }).then(function (modal) {
                vm.modal = modal;
                vm.modal.show();
            });
        }

        $ionicHistory.nextViewOptions({
            disableBack: true
        });
    });
}
