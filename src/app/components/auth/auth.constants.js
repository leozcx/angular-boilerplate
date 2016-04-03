(function() {
	'use strict'
	
	angular.module('auth')
	.constant('GET_USER_ENDPOINT', 'api/user.json')
	.constant('LOGIN_ENDPOINT', 'api/user.json')
	.constant('METHOD', 'get');
})();