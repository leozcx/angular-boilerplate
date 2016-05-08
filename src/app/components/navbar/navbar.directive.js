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
			controller : ["navConfigProvider", "$http", "$scope", "navBarService", function(navConfigProvider, $http, $scope, navBarService) {
				var vm = this;
				vm.selectedPage = navBarService.selectedPage ? navBarService.selectedPage : navConfigProvider.config[0];
				vm.selectedPage.expanded = true;
				vm.data = vm.menu || navConfigProvider.config;
                                vm.getSelectedPage = function() {
                                    console.log(navBarService.selectedPage);
                                    return vm.selectedPage;
                                };
                                vm.navBarService = navBarService;
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
				vm.toggle = function(item) {
					item.expanded = !item.expanded;
                                        if(!item.hasChildren)
					    navBarService.selectedPage = item;
				};
				vm.hasPermit = function(item) {
					return true;
				};
			}]
		};

		return directive;
	}

        module.factory('navBarService', [function() {
            return {
                selectedPage: null
            };
        }]);
})();
