(function() {
	'use strict'

	describe('Authentication service', function() {
		beforeEach(module('auth'));
		
		describe('Authentication service should act correctly', function() {
			var authService, $httpBackend;
			
			beforeEach(inject(function(_AuthenticationService_, _$httpBackend_, LOGIN_ENDPOINT) {
				authService = _AuthenticationService_;
				$httpBackend = _$httpBackend_;
				$httpBackend.when('GET', LOGIN_ENDPOINT).respond(200, {
					'id': '1',
					'type': 'developer',
					'name': 'user1'
				});
				
				$httpBackend.when('POST', LOGIN_ENDPOINT).respond(function(method, url, data) {
					var json = JSON.parse(data);
					if(json.name === 'user1' && json.password === 'pass') {
						return [200, {
							'id': '1',
							'type': 'developer',
							'name': 'user1'
						}];
					} else {
						return [401];
					}
				});
			}));
			
			it('should be logged in', function() {
				authService.login({'name': 'user1', 'password': 'pass'}).then(function(user) {
					expect(authService.getUser().id).toBe('1');
				}, function(error) {
					console.log(error)
				});
				$httpBackend.flush();
			});
			
			it('should not be logged in with incorrect password', function() {
				authService.login({'name': 'user1', 'password': 'wrong'}).then(function(user) {
					expect(authService.getUser().id).toBe('1');
				}, function(error) {
					expect(error.status).toBe(401);
				});
				$httpBackend.flush();
			});
		});

		describe('route filter service', function() {
			var routeService, $location, $rootScope;
			beforeEach(inject(function(_RouteFilterService_, _$location_,
					_$rootScope_) {
				routeService = _RouteFilterService_;
				$location = _$location_;
				$rootScope = _$rootScope_;
				routeService.register('1', [ '/admin' ], function() {
					return false;
				}, '/');
				routeService.register('1', [ '/pub' ], function() {
					return true;
				}, '/');
			}));

			it('match should be calculated correctly', function() {
				expect(routeService._match('/test', '/test')).toEqual(true);
				expect(routeService._match('/test', '/test1')).toEqual(false);
				expect(routeService._match(/\/test*/, '/test1')).toEqual(true);
				expect(routeService._match(/\/tet+/, '/test1')).toEqual(false);
			});

			it('should be redirected to /', function() {
				$location.path('/admin');
				routeService.run('/admin');
				expect($location.path()).toBe('/');
			});

			it('should not be redirected', function() {
				$location.path('/pub');
				routeService.run('/pub');
				expect($location.path()).toBe('/pub');
			});
		});
	});
})();