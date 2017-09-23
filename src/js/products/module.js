import Controller from './controller';
import template from './template';

const module = angular.module('discountAsciiWarehouseProducts', []);

module.component('products', {
    template: template,
    controller: Controller,
});

export default module;
