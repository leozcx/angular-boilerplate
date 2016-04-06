(function() {
	'use strict'
	
	var module = angular.module('header', []);
	
	module.directive('didiHeader', [function() {
		var directive = {
			restrict: 'E',
			templateUrl: 'app/components/header/header.html',
			controllerAs : 'vm',
			bindToController : true,
			controller: function() {
				var vm = this;
				vm.username = "Test";
			}
		};
		
		return directive;
	}]);
})();