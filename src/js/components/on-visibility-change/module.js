import linkFn from './link';

/** @type {!angular.module} */
const module = angular.module('onVisibilityChange', []);

module.directive('onVisibilityChange', () => {
    return {
        link: linkFn,
        restrict: 'A',
        scope: null,
    };
});

export default module;
