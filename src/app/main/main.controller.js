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
									'iconClass': 'new-icon new-icon-report',
									'href': '/#/report'
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
			})
			.controller('ReportController', ['$scope', function($scope) {
				$scope.BUSINESS = "业务线";
				$scope.TIME = "时间";
				
				$scope.date = {
				        startDate: moment().subtract(1, "days"),
				        endDate: moment()
				    };
				    $scope.date2 = {
				        startDate: moment().subtract(1, "days"),
				        endDate: moment()
				    };
				    $scope.opts = {
				        locale: {
				            applyClass: 'btn-green',
				            applyLabel: "Použít",
				            fromLabel: "Od",
				            toLabel: "Do",
				            cancelLabel: 'Zrušit',
				            customRangeLabel: 'Vlastní rozsah',
				            daysOfWeek: ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'],
				            firstDay: 1,
				            monthNames: ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září',
				                'Říjen', 'Listopad', 'Prosinec'
				            ]
				        },
				        ranges: {
				            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
				            'Last 30 Days': [moment().subtract(29, 'days'), moment()]
				        }
				    };
				    $scope.setStartDate = function () {
				        $scope.date.startDate = moment().subtract(4, "days");
				    };
				    $scope.setRange = function () {
				        $scope.date = {
				            startDate: moment().subtract(5, "days"),
				            endDate: moment()
				        };
				    };
				    //Watch for date changes
				    $scope.$watch('date', function(newDate) {
				        console.log('New date set: ', newDate);
				    }, false);
				    
				    var pageload = {
				            name: 'page.load',
				            datapoints: [
				                { x: 2001, y: 1012 },
				                { x: 2002, y: 1023 },
				                { x: 2003, y: 1045 },
				                { x: 2004, y: 1062 },
				                { x: 2005, y: 1032 },
				                { x: 2006, y: 1040 },
				                { x: 2007, y: 1023 },
				                { x: 2008, y: 1090 },
				                { x: 2009, y: 1012 },
				                { x: 2010, y: 1012 },
				            ]
				        };

				        var firstPaint = {
				            name: 'page.firstPaint',
				            datapoints: [
				                { x: 2001, y: 22 },
				                { x: 2002, y: 13 },
				                { x: 2003, y: 35 },
				                { x: 2004, y: 52 },
				                { x: 2005, y: 32 },
				                { x: 2006, y: 40 },
				                { x: 2007, y: 63 },
				                { x: 2008, y: 80 },
				                { x: 2009, y: 20 },
				                { x: 2010, y: 25 },
				            ]
				        };

				        $scope.config = {
				            title: 'Line Chart',
				            subtitle: 'Line Chart Subtitle',
				            debug: true,
				            showXAxis: true,
				            showYAxis: true,
				            showLegend: true,
				            stack: false,
				        };

				        $scope.data = [ pageload ];
				        $scope.multiple = [pageload, firstPaint ];
			}]);;

	/** @ngInject */
	function MainController($log, AuthenticationService, ApplicationService) {
		ApplicationService.registerListener(function() {
			$log.debug(AuthenticationService.getUser());
		});
		var vm = this;
	}
})();
