import Controller from './controller';
import template from './template';

/** @type {!angular.module} */
const module = angular.module('productInlineAdvertisement', []);

module.component('productInlineAdvertisement', {
    template: template,
    controller: Controller,
    bindings: {
        advertisement: '<',
    },
});

export default module;
