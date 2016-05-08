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
            'iconClass': 'glyphicon glyphicon-cog',
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
                'href': '/#/signin'
            }
            ]
        }
        ];
    }
})();
