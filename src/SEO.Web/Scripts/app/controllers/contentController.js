(function () {

    'use strict';

    var app = angular.module('app');

    app.constant('apiPath', '/api')

    app.controller('contentController',

            ['$scope', 'contentService', '$window', '$document', '$location', '$state',
    function ($scope,   contentService,   $window,   $document,   $location,   $state) {

        $scope.markup = null;

        $scope.showLoader = false;

        $scope.renderContent = function (e) {

            $scope.showLoader = true;
            $scope.markup = null;
            $scope.hideOriginalMarkup = true;

            var path = e.target.pathname;

            contentService.getContent(path).then(function (content) {
                $scope.showLoader = false;
                $scope.markup = content.markup;
                $document[0].title = content.title;
                $location.state(null, '', path);
            });

            $location.$locationChangeSuccess = function () {
                alert('locationChangeSuccess');
            };

            // todo: jqLite selector?
            $(window).on('popstate', function () {
                var path = $window.location.pathname;

                $scope.$apply(function () {
                    if (path === '/articles/') {
                        $scope.hideOriginalMarkup = false;
                        $document[0].title = 'articles';
                        $scope.markup = null;
                    } else {
                        $scope.showLoader = true;
                        $scope.markup = null;
                        contentService.getContent(path).then(function (content) {
                            $scope.showLoader = false;
                            $document[0].title = content.title;
                            $scope.markup = content.markup;
                        });
                    }
                });
            });
        };
    }]);

    app.service('contentService',

                ['$http', '$q', 'apiPath',
        function ($http,   $q,   apiPath) {

            var svc = {
                getContent: function (path) {
                    var deferred = $q.defer();

                    $http.get(apiPath + path).success(function (content) {
                        deferred.resolve(content);
                    });

                    return deferred.promise;
                }
            };

            return svc;

        }]);

    app.directive('ajaxNavigationAnchorClicks',

                ['$document', '$window', // todo: change to $location?
        function ($document,   $window) {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {

                    // todo: jqLite selector
                    var container = $('div[data-ng-controller="contentController"]');

                    container.on('click', function (e) {
                        if (e.target.nodeName.toLowerCase() === 'a') {

                            var href = e.target.getAttribute('href');
                            var root = $window.location.pathname;

                            var isRelativeLink = function(root, href){
                                return href.indexOf('/') === 0 ||
                                       href.indexOf($window.location.origin) != -1;
                            };

                            if (isRelativeLink(root, href)) {

                                e.preventDefault();

                                scope.renderContent(e);

                                return false;
                            }
                        }
                    });
                }
            };
        }]);
}());