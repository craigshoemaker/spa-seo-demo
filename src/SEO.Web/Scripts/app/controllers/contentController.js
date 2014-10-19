(function () {

    'use strict';

    var app = angular.module('app');

    app.constant('apiPath', '/api')

    app.controller('contentController',

            ['$scope', 'contentService',
    function ($scope,   contentService) {

        $scope.markup = null;

        $scope.showLoader = false;

        $scope.renderContent = function (e) {
            e.preventDefault();

            $scope.showLoader = true;

            var path = e.target.pathname;

            contentService.getContent(path).then(function (content) {
                $scope.showLoader = false;
                $scope.markup = content.markup;
            });

            return false;
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

    app.directive('a', ['$window', function ($window) {
        return {
            restrict: 'E',
            link: function (scope, el, attrs) {
                angular.forEach(el, function (val, key) {
                    if (val.hostname === $window.location.hostname) {
                        $(val).click(scope.renderContent);
                    }
                });
            }
        };
    }]);

}());