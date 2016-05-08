(function() {
	'use strict'
	
	var module = angular.module('header', ['pascalprecht.translate']);
	
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
	
	module.config(['$translateProvider', function($translateProvider) {
		$translateProvider.translations('zh', {
	        'TITLE': '客服&体验数据平台',
	        'SIGNOUT': '退出'
	      });
	     
	      $translateProvider.preferredLanguage('zh');
	}]);
})();