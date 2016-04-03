(function() {
	'use restrict'
	
	angular.module('demo').controller('LoadingController', ['$location', 'ApplicationService', function($location, ApplicationService) {
		ApplicationService.registerListener(function() {
			$location.path('/');
		});
	}]);
})();