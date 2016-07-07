(function() {
    'use strict';

    angular
        .module('main')
        .directive('jhSocial', jhSocial);

    jhSocial.$inject = ['$translatePartialLoader', '$translate', '$filter', 'SocialService','$sce'];

    function jhSocial($translatePartialLoader, $translate, $filter, SocialService, $sce) {
        var directive = {
            restrict: 'E',
            scope: {
                provider: '@ngProvider'
            },
            templateUrl: 'main/jhipster/account/social/directive/social.html',
            link: linkFunc
        };

        return directive;

        /* private helper methods */

        function linkFunc(scope) {

            $translatePartialLoader.addPart('social');
            $translate.refresh();

            scope.label = $filter('capitalize')(scope.provider);
            scope.providerSetting = SocialService.getProviderSetting(scope.provider);
            scope.providerURL = $sce.trustAsResourceUrl(SocialService.getProviderURL(scope.provider));
            scope.csrf = SocialService.getCSRF();
        }

    }
})();
