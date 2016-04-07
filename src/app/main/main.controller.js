(function() {
	'use strict';
	
	angular.module('demo').controller('MainController', MainController)
			.controller(
					'TestController',
					function($scope, ApplicationService, $timeout,
							spinnerService, $q) {
//						$timeout(function() {
//							//spinnerService.hide('mainSpinner');
//						}, 2000);
						$scope.fetch = function() {
							var defer = $q.defer();
							var tmp = [{
									'pageId': '5',
									'pageDisplayName_key': 'hahah',
									'requiredPermits': [],
									'hasIcon': true,
									'iconClass': 'new-icon new-icon-report'
							}];
							console.log(tmp)
							defer.resolve(tmp);
							console.log("test invoked");
							return defer.promise;
						};
						$scope.name = "leo";
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
