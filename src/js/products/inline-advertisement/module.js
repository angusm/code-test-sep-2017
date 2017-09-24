import Controller from './controller';
import template from './template';

const module = angular.module('productInlineAdvertisement', []);

module.component('productInlineAdvertisement', {
    template: template,
    controller: Controller,
});

export default module;
