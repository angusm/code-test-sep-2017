import Controller from './controller';
import template from './template';

/** @type {!angular.module} */
const module = angular.module('product', []);

module.component('product', {
    template: template,
    controller: Controller,
    bindings: {
        product: '=',
    },
});

export default module;
