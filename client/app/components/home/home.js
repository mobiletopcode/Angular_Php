import angular from 'angular';
import uiRouter from 'angular-ui-router';
import homeComponent from './home.component';
import feedback from './feedbackloop/feedbackloop';
require('angular-permission');

let homeModule = angular.module('home', [
    uiRouter, 'permission', feedback.name
  ])

  .config(($stateProvider, $urlRouterProvider) => {
    "ngInject";
    $urlRouterProvider.otherwise('/feedbacks');
    $stateProvider
      .state('home', {
        url: '/',
        abstract: true,
        template: '<home></home>'
      });
  })

  .component('home', homeComponent);

export default homeModule;
