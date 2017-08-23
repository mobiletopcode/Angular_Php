import "jquery";
import 'jquery-ui';
import '../../node_modules/bootstrap/less/bootstrap.less';
import 'bootstrap';

import '../../node_modules/bootstrap-material-design/less/bootstrap-material-design.less';
import '../../node_modules/bootstrap-material-design/less/ripples.less';
import 'arrive';
import 'bootstrap-material-design';

import angular from 'angular';
import "angular-ui-sortable";
import uiRouter from 'angular-ui-router';
import 'angular-component';
import uiBootstrap from 'angular-ui-bootstrap';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';

import 'normalize.css';


angular.module('app', [
    uiRouter,
    uiBootstrap,
    Common.name,
    Components.name
  ])

  .component('app', AppComponent)

  .run(($timeout) => {
    'ngInject';
    $timeout(() => {
        $.material.init();
    })
  });