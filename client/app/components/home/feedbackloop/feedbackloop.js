import angular from 'angular';
import uiRouter from 'angular-ui-router';
import feedbackloopComponent from './feedbackloop.component';

let feedbackloopModule = angular.module('feedbackloop', [
  uiRouter
])

.component('feedbackloop', feedbackloopComponent)
.config(($stateProvider, $urlRouterProvider) => {
      "ngInject";
  
      $stateProvider
          .state('home.feedbacks', {
            url: '^/feedbacks',
            template: '<feedbackloop></feedbackloop>'
          });
    })
;

export default feedbackloopModule;
