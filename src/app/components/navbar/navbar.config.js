(function() {
	'use strict';
	angular.module('navBar').provider('navConfigProvider', navConfigProvider);
	function navConfigProvider() {
		this.$get = function() {
			return this;
		};
		this.config = [
						{
							'pageId': 'report-management',
							'pageDisplayName_key': 'Management',
							'requiredPermits': [],
							'hasChildren': false,
							'hasIcon': true,
							'href': "/#/manage",
							'iconClass': 'new-icon new-icon-report',
						},
                                                {
                                                    'pageId': 'l2',
                                                    'pageDisplayName': 'Level 2 menu',
                                                    'hasChildren': true,
                                                    'iconClass': 'test',
                                                    'children': [
                                                    {
                                                        'pageId': 'login',
                                                        'pageDisplayName': 'Login',
                                                        'href': '/#/login'
                                                    }
                                                    ]
                                                }
					];
	}
})();
