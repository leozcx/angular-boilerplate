(function() {
	'use strict';

	angular.module('demo').controller('MainController', MainController)
			.controller(
					'TestController',
					function($scope, ApplicationService, $timeout,
							spinnerService) {
						$timeout(function() {
							spinnerService.hide('mainSpinner');
						}, 2000);
					})
			.controller('LoginController', function($scope,AuthenticationService) {
				$scope.login = function() {
					console.log('login clicked')
					AuthenticationService.login();
				};
				
				$scope.logout = function() {
					AuthenticationService.logout();
				}
			});

	/** @ngInject */
	function MainController($log, AuthenticationService, ApplicationService) {
		ApplicationService.registerListener(function() {
			$log.debug(AuthenticationService.getUser());
		});
		var vm = this;
	}
})();
