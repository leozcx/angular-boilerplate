(function() {
    'use strict';
    angular.module('navBar').provider('navConfigProvider', navConfigProvider);
    function navConfigProvider() {
        this.$get = function() {
            return this;
        };
        this.config = [
        {
            'id': 'report-management',  //unique id
            'displayName_key': 'Management',  //for translation
            'displayName': 'Management',  //if displayName_key is not present, use this value
            'requiredPermits': [],  //what permits needed to display this item
            'hasChildren': false,  //whether has level 2 item
            'hasIcon': true,  //whether has icon
            'href': "/#/manage",  //which page to show when clicked
            'iconClass': 'glyphicon glyphicon-cog' //icon class
        },
        {
            'id': 'l2',
            'displayName': 'Level 2 menu',
            'hasChildren': true,
            'iconClass': 'test',
            'children': [
            {
                'id': 'login',
                'displayName': 'Login',
                'href': '/#/signin'
            },
            {
                id: 'test',
                name: 'Test',
                hasChildren: true,
                children:  [{
                    id: 'test-1',
                    name: 'Level 3'
                }]

            }
            ]
        }
        ];
    }
})();
