import Controller from './controller';
import template from './template';

/** @type {!angular.module} */
const module = angular.module('advertisement', []);

module.component('advertisement', {
    template: template,
    controller: Controller,
    bindings: {
        advertisement: '<',
    },
});

export default module;
