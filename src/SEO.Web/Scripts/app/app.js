angular.module('app', ['ngResource', 'ui.router'])
    .config(
                ['$locationProvider', '$stateProvider',
        function ($locationProvider,   $stateProvider) {

            $locationProvider.html5Mode(true);

            $stateProvider
                .state('articles', {
                    url: '/articles/',
                    templateUrl: '/partial/',
                    controller: 'articlesController'
                })

                .state('article', {
                    url: '/articles/:pageName',
                    templateUrl: function ($stateParams) {
                        return '/partial/' + $stateParams.pageName;
                    },
                    controller: 'articlesController'
                });
        }]);