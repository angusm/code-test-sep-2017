import isVisible from '../../handies/dom/is-visible'
import fastdom from '../../../../node_modules/fastdom/fastdom'

/**
 * @export
 * @ngInject
 */
function linkFn(scope, element, attrs) {
    const onVisibilityChange = scope.$eval(attrs.onVisibilityChange);
    const rawElement = element[0];
    let lastVisibility = null;
    setupPreRender();

    function setupPreRender() {
        fastdom.measure(() => preRender());
    }

    function preRender() {
        const visibility = isVisible(rawElement);
        if (!!onVisibilityChange && visibility !== lastVisibility) {
            lastVisibility = visibility;
            onVisibilityChange(visibility);
        }
        fastdom.mutate(() => setupPreRender());
    }
}

export default linkFn;
