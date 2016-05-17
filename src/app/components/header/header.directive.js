(function() {
    'use strict'

    var module = angular.module('header', ['pascalprecht.translate', 'ngAnimate']);

    module.directive('header', [function() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/header/header.html',
            controllerAs : 'vm',
            bindToController : true,
            controller: ['$scope', '$log', '$http', function($scope, $log, $http) {
                var vm = this;
                vm.isCollapsed = true;
                vm.collapseMenu = collapseMenu;
                vm.username = "Test";
                vm.version = null;

                $http({
                    method: 'get',
                    url: '/version.json'
                }).then(function(resp) {
                    vm.version = resp.data;
                });

                function collapseMenu() {
                    console.log('on blue');
                    fm.isCollapsed = true;
                }
                $scope.items = [
                    'The first choice!',
                    'And another choice for you.',
                    'but wait! A third!'
                ];

                $scope.status = {
                    isopen: false
                };
                

                $scope.toggled = function(open) {
                    $log.log('Dropdown is now: ', open);
                };

                $scope.toggleDropdown = function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $scope.status.isopen = !$scope.status.isopen;
                };

                $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));
            }]
        };

        return directive;
    }]);

    module.config(['$translateProvider', function($translateProvider) {
        $translateProvider.translations('zh', {
            'TITLE': '客服&体验数据平台',
            'SIGNOUT': '退出'
        });

        $translateProvider.preferredLanguage('zh');
    }]);
})();
