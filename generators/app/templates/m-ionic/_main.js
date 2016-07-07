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
        'ngCacheBuster', <% if (enableTranslation) { %>
        'tmh.dynamicLocale',
        'pascalprecht.translate', <% } %>
        'infinite-scroll'
        // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider) {

    // ROUTING with ui.router
    $urlRouterProvider.otherwise('/app/home');
    $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'main/templates/menu.html',
            controller: 'MenuCtrl as vm',
            resolve: {
                authorize: ['Auth',
                    function (Auth) {
                        return Auth.authorize();
                    }
                ]<% if (enableTranslation) { %>,
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('global');
                    }]<% } %>
        }
})
    .state('login', {
        parent: 'app',
        url: '/login',
        data: {
            authorities: []
        },
        views: {
            'pageContent': {
                // templateUrl: 'main/services/login/login.html',
                controller: 'LoginCtrl as vm'
            }
        },
        resolve: {
            translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                $translatePartialLoader.addPart('login');
                return $translate.refresh();
            }]
        }
    })
        .state('home', {
            parent: 'app',
            url: '/home',
            data: {
                authorities: []
            },
            views: {
                'pageContent': {
                    templateUrl: 'main/templates/home.html',
                    controller: 'HomeCtrl as vm'
                }
            },
            resolve: {
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                    $translatePartialLoader.addPart('home');
                    return $translate.refresh();
                }]
            }
        });
});
