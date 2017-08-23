import template from './feedbackloop.html';
import controller from './feedbackloop.controller';
import './feedbackloop.styl';

let feedbackloopComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default feedbackloopComponent;
