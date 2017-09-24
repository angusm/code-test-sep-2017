import Controller from './controller';
import inlineAdvertisementModule from './inline-advertisement/module'
import productModule from './product/module'
import template from './template';

const module = angular.module('discountAsciiWarehouseProducts', [
    inlineAdvertisementModule.name,
    productModule.name,
]);

module.component('products', {
    template: template,
    controller: Controller,
});

export default module;
