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
      .state('login', {
        parent: 'main',
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
      .state('home', {
        parent: 'main',
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
      });
  });
