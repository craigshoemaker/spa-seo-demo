angular.module('app', ['ngResource', 'ui.router'])
    .config(
                ['$locationProvider', '$stateProvider',
        function ($locationProvider,   $stateProvider) {

            $locationProvider.html5Mode(true);

            $stateProvider
                .state('articles', {
                    url: '/articles/',
                    templateUrl: '/api/articles?type=partial',
                    controller: 'articlesController'
                })

                .state('article', {
                    url: '/articles/:pageName',
                    templateUrl: function ($stateParams) {
                        return '/api/articles/' + $stateParams.pageName + '?type=partial';
                    },
                    controller: 'articlesController'
                });
        }]);