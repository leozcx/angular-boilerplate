This is a reusable component for authentication and authorization; it contains 2 services:

- AuthenticationService
  could perform login/logout
- RouteFilterService
  could perform ahthorization
  
## How to use

1. add dependency 'auth' to your module
2. update login endpoint in auth.contants.js
3. register route, could be done in `run` block, sample: 
```
//if not authenticated, user will be redirected to '/signin' when accessing '/profile'
RouteFilterService.register('auth', ['/profile'], function() {
			return AuthenticationService.exists();
		}, '/signin');
//user will be redirected to '/403' when accessing '/admin' if he/she doesnot have permission		
RouteFilterService.register('admin', ['/admin'], function() {
			return AuthenticationService.isDeveloper();
		}, '/403');
```
