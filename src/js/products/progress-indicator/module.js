import Controller from './controller';
import template from './template';

const module = angular.module('progressIndicator', []);

module.component('progressIndicator', {
    template: template,
    controller: Controller,
    bindings: {
        product: '=',
    },
});

export default module;
