(function() {
	'use strict'
	var module = angular.module('auth', []);
	module.service('AuthenticationService', ['$http', '$q', "$timeout", 'GET_USER_ENDPOINT', 'LOGIN_ENDPOINT', 'METHOD',
	                                         function($http, $q, $timeout, GET_USER_ENDPOINT, LOGIN_ENDPOINT, METHOD) {
		var user = null;
		return {
			requestUser: function() {
				var defer = $q.defer();
				$http({
					method: METHOD,
					url: GET_USER_ENDPOINT
				}).then(function(resp) {
					$timeout(function() {
						user = resp.data;
						defer.resolve(resp.data);
					}, 2000);
					
				}, function(error) {
					defer.reject(error);
				});
				return defer.promise;
			},
			
			getUser: function() {
				return user;
			},
			
			exists: function() {
				return user != null;
			},
			
			login: function(credential) {
				var defer = $q.defer();
				$http({
					method: METHOD,
					url: LOGIN_ENDPOINT,
					data: credential
				}).then(function(resp) {
					if(resp) {
						user = resp.data;
						defer.resolve(resp.data);
					} else {
						defer.reject("incorrect user");
					}
				}, function(error) {
					defer.reject(error);
				});
				return defer.promise;
			},
			
			logout: function() {
				user = null;
			},
			
			isDeveloper: function() {
				return this.exists() && user.type == 'developer';
			}
		}
	}]);
})();