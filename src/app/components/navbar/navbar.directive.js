(function() {
	'use strict';
	
	var module = angular.module('navBar', ['ngAnimate']);
	module.directive('navBar', [ acmeNavbar]);
	
	/** @ngInject */
	function acmeNavbar() {
		var directive = {
			restrict : 'E',
			templateUrl : 'app/components/navbar/navbar.html',
			controllerAs : 'vm',
			bindToController : true,
			controller : function(navConfigProvider, $http) {
				var vm = this;
				vm.selectedPage = navConfigProvider.config[0];
				vm.selectedPage.expanded = true;
				vm.data = navConfigProvider.config;
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
					vm.selectedPage = item;
				};
				
				vm.hasPermit = function(item) {
					console.log(item)
					return true;
				};
			}
		};

		return directive;
	}
})();
