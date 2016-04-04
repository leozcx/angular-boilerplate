(function() {
  'use strict';

  angular
    .module('demo')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, $translateProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
    
    $translateProvider.translations('zh', {
        'TITLE': '用户体验平台',
        'DATA_REPORT': '数据报告',
        'DATA_OVERVIEW': '主页',
        'BUSINESS_LINE': '个人',
        'TAXI': '个人资料',
        'SPECIAL_CAR': '专车',
        'ISSUE_TRACKING': '登陆',
        'ISSUE_LIST': '登陆',
        'USER_FEEDBACK': '用户反馈'
      });
     
      $translateProvider.preferredLanguage('zh');
  }

})();
