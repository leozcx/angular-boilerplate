(function() {
	'use strict'
	/**
	 * This service provides page-base permission control.
	 */
	angular.module('auth').service('RouteFilterService', ['$location', function($location) {
		var filters = [];
		var getFilter = function(route) {
			for(var i = filters.length - 1; i >= 0; i--) {
				for(var j = filters[i].routes.length - 1; j >= 0; j--) {
					if(match(filters[i].routes[j], route))
						return filters[i];
				}
			}
		};
		var match = function(route1, route2) {
			if(route1 instanceof RegExp)
				return route1.test(route2);
			else
				return route1 === route2;
		};
		return {
			/**
			 * register a route filter.
			 * name: the name of the filter, could be any
			 * routes: an array including all url, support regexp, e.g. ['/admin/*', '/profile']
			 * callback: a function return whether or not the 'routes' could be accessed, it should return true or false
			 * redirectUrl: optional, if callback returns false, which url should be redirected to
			 */
			register: function(name, routes, callback, redirectUrl) {
				filters.push({
					name: name,
					routes: routes,
					callback: callback,
					redirectUrl: redirectUrl
				});
			},
			/**
			 * Should be triggered when route is changed.
			 */
			run: function(route) {
				var filter = getFilter(route);
				if(filter && filter.redirectUrl) {
					if(!filter.callback()) {
						$location.path(filter.redirectUrl);
					}
				}
			},
			/**
			 * For unit test.
			 */
			_match: match
		}
	}]);
})();