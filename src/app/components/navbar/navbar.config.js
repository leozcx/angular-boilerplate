(function() {
	'use strict';
	angular.module('auth').provider('navConfigProvider', navConfigProvider);
	function navConfigProvider() {
		this.$get = function() {
			return this;
		};
		this.config = [
						{
							'pageId': '1',
							'pageDisplayName_key': 'DATA_REPORT',
							'requiredPermits': [],
							'hasChildren': true,
							'hasIcon': true,
							'iconClass': 'new-icon new-icon-report',
							'children': [
								{
									'pageId': '1.1',
									'pageDisplayName_key': 'DATA_OVERVIEW',
									'href': '/#/',
									'requiredPermits': []			
								},
								{
									'pageId': '1.2',
									'pageDisplayName_key': 'BUSINESS_LINE',
									'hasChildren': true,
									'children': [
										{
											'pageId': '1.2.1',
											'href': '/#/profile',
											'pageDisplayName_key': 'TAXI'
										}, {
											'pageId': '1.2.2',
											'href': '/#/signin',
											'pageDisplayName_key': 'SPECIAL_CAR'
										}
									]
								}
							]
						}, 
						{
							'pageId': '2',
							'pageDisplayName_key': 'ISSUE_TRACKING',
							'requiredPermits': [],
							'hasIcon': true,
							'iconClass': 'new-icon new-icon-track',
							'hasChildren': true,
							'children': [
								{
									'pageId': '2.1',
									'pageDisplayName_key': 'ISSUE_LIST',
									'requiredPermits': [],
									'href': '/#/signin'
								}
							]
						},
						{
							'pageId': 'customer-feedback',
							'pageDisplayName_key': 'USER_FEEDBACK',
							'requiredPermits': ['23'],
							'hasIcon': true,
							'iconClass': 'new-icon new-icon-track',
							'hasChildren': false
						}
					];
	}
})();