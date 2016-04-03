(function() {
	'use strict';

	angular.module('demo').run(runBlock);

	/** @ngInject */
	function runBlock($log, $location, $rootScope, AuthenticationService, ApplicationService, RouteFilterService) {
		$rootScope.$on('$locationChangeStart', function(event, newUrl, oldUrl) {
			
			RouteFilterService.run($location.path());
//			$log.debug("old: " + oldUrl +"; new: " + newUrl +"; path: " + $location.path())
//			if($location.path() == '/loading') return;
//			if(!ApplicationService.isReady()) {
//				$location.path('/loading');
//			}
		});
		
		RouteFilterService.register('auth', ['/profile'], function() {
			return AuthenticationService.exists();
		}, '/signin');
		
		RouteFilterService.register('admin', ['/admin'], function() {
			return AuthenticationService.isDeveloper();
		}, '/403');
	}

})();
