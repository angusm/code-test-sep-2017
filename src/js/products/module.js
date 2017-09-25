import Controller from './controller';
import advertisementModule from './advertisement/module';
import onVisibilityChangeModule from '../components/on-visibility-change/module';
import productModule from './product/module';
import progressIndicatorModule from './progress-indicator/module';
import template from './template';

const module = angular.module('discountAsciiWarehouseProducts', [
    advertisementModule.name,
    onVisibilityChangeModule.name,
    productModule.name,
    progressIndicatorModule.name,
]);

module.component('products', {
    template: template,
    controller: Controller,
});

export default module;
