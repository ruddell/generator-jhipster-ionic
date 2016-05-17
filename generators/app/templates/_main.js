'use strict';
angular.module('main', [
    'ionic',
    'ngCordova',
    'ui.router',
    'ui.bootstrap',
    'ngStorage',
    'ngResource',
    'ngCookies',
    'ngAria',
    'ngCacheBuster',
    'infinite-scroll'
    // TODO: load other modules selected during generation
  ])
  .config(function ($stateProvider, $urlRouterProvider) {

    // ROUTING with ui.router
    $urlRouterProvider.otherwise('/main/home');
    $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
      .state('main', {
        url: '/main',
        abstract: true,
        templateUrl: 'main/templates/menu.html',
        controller: 'MenuCtrl as vm',
        resolve: {
          authorize: ['Auth',
            function (Auth) {
              return Auth.authorize();
            }
          ]
        }
      })
      .state('main.login', {
        url: '/login',
        data: {
          authorities: []
        },
        views: {
          'pageContent': {
            // templateUrl: 'main/services/login/login.html',
            controller: 'LoginCtrl as vm'
          }
        }
      })
      .state('main.home', {
        url: '/home',
        data: {
          authorities: []
        },
        views: {
          'pageContent': {
            templateUrl: 'main/templates/home.html',
            controller: 'HomeCtrl as vm'
          }
        }
      })
      .state('main.list', {
        url: '/list',
        data: {
          authorities: []
        },
        views: {
          'pageContent': {
            templateUrl: 'main/templates/list.html',
            // controller: '<someCtrl> as ctrl'
          }
        }
      })
      .state('main.listDetail', {
        url: '/list/detail',
        data: {
          authorities: []
        },
        views: {
          'pageContent': {
            templateUrl: 'main/templates/list-detail.html',
            // controller: '<someCtrl> as ctrl'
          }
        }
      })
      .state('main.debug', {
        url: '/debug',
        data: {
          authorities: []
        },
        views: {
          'pageContent': {
            templateUrl: 'main/templates/debug.html',
            controller: 'DebugCtrl as ctrl'
          }
        }
      });
  });
