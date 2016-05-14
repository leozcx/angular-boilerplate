(function() {
    'use strict';

    var module = angular.module('navBar', ['ngAnimate']);
    module.directive('navBar', [ acmeNavbar]);

    /** @ngInject */
    function acmeNavbar() {
        var directive = {
            restrict : 'EA',
            templateUrl : 'app/components/navbar/navbar.html',
            controllerAs : 'vm',
            scope: {},
            bindToController : {
                name: '=',
                menu: '='
            },
            controller : ["$location", "navConfigProvider", "$http", "$scope", function($location, navConfigProvider, $http, $scope) {
                var vm = this;
                vm.onItemClick = onItemClick;
                vm.data = vm.menu || navConfigProvider.config;
                vm.selectedPage = vm.selectedPage ? vm.selectedPage : vm.data[0];
                vm.selectedPage.expanded = true;
                vm.hasPermit = function(pageItem) {
                    if(!vm.permits)
                        return false;
                    var result = true;
                    if(pageItem.requiredPermits) {
                        pageItem.requiredPermits.forEach(function(permit) {
                            result = result && vm.permits[permit];
                        });
                    }
                    return result;
                };
                function toggle(item) {
                    item.expanded = !item.expanded;
                }
                function onItemClick(item) {
                    if(item.hasChildren) //this is parent menu item, expand/collapse it
                        toggle(item);
                    else {
                        vm.selectedPage = item;
                        $location.path(item.href);
                    }
                }
                vm.hasPermit = function(item) {
                    return true;
                };
            }]
        };

        return directive;
    }
})();
