(function() {
  'use strict';

  angular
    .module('demo')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/loading', {
    	  templateUrl: 'app/loading/loading.html',
    	  controller: 'LoadingController',
    	  controllerAs: 'loading'
      })
      .when('/profile', {
    	  template: '<spinner name=\'mainSpinner\' show="true"><h3>loading...</h3></spinner><div>Profile</div>',
    	  controller: 'TestController'
      })
      .when('/admin', {
    	  template: '<div>admin</div>',
      })
      .when('/signin', {
    	  templateUrl: 'app/pages/login.html',
    	  controller: 'LoginController'
      })
      .when('/report', {
    	  templateUrl: 'app/pages/report.html',
    	  controller: 'ReportController'
      })
      .when('/403', {
    	  template: '<div>You donnot have permission to view this page</div>'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
