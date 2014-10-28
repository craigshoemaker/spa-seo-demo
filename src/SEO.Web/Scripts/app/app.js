angular.module('app', ['ngAnimate','ngResource', 'ui.router', 'anim-in-out'])

    .config(
                ['$locationProvider', '$stateProvider',
        function ($locationProvider,   $stateProvider) {

            $locationProvider.html5Mode(true);

            $stateProvider
                .state('articles', {
                    url: '/articles',
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
        }])

    .run(
                ['$rootScope',
        function ($rootScope) {

        $rootScope.page = {
            setTitle: function(title) {
                this.title = title;
            }
        }

        $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
            $rootScope.page.setTitle(current.$$route.title || 'Articles');
        });
    }]);


angular.module('app').directive('extractTitleFromContent',

            ['$rootScope',
    function ($rootScope) {
        return {
            link: function (scope, element) {

                if (element.find('h1').length > 0) {
                    var title = element.find('h1')[0].innerHTML;
                    $rootScope.page.setTitle(title);
                }
            }
        }
    }]);