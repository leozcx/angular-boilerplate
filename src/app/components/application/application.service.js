(function() {
	'use strict'
	angular.module('demo').service('ApplicationService', [function() {
	var ready = false;
	var callbacks = [];
	var targetUrl = null;
	var callListeners = function() {
		callbacks.forEach(function(callback) {
			callback();
		});
	}
	return {
		
		isReady: function() {
			return ready;
		},
		
		makeReady: function(r) {
			ready = r;
			callListeners();
		},
		
		registerListener: function(callback) {
			if(ready)
				callback();
			else {
				callbacks.push(callback);
			}
		},
		
		targetUrl: function(target) {
			if(target === undefined)
				return targetUrl;
			else
				targetUrl = target;
		}
	};
}]);
})();