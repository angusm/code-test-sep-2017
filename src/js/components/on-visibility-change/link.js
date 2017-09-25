import isVisible from '../../handies/dom/is-visible'
import fastdom from '../../../../node_modules/fastdom/fastdom'

/**
 * Link function for the on-visibility-change directive.
 *
 * Uses fastdom to measure visibility without introducing jank.
 * Triggers a callback when the visibility state changes.
 *
 * EXPANSION: If a version needing to trigger the callback once per frame
 * is necessary, then the relevant parts of this code should be extracted and
 * modified for that component rather than duplicated.
 *
 * @param {!angular.Scope} scope Angular scope for the directive.
 * @param {!angular.JQLite} element Element the directive is attached to.
 * @param {!angular.Attributes} attrs Attributes attached to the directive.
 * @export
 * @ngInject
 */
function linkFn(scope, element, attrs) {
    /** @type {function(boolean)} */
    const onVisibilityChange = scope.$eval(attrs['onVisibilityChange']);

    /** @type {?boolean} */
    let lastVisibility = null;

    setupMeasure();

    /**
     * Sets up the next measure call.
     * Extracted as it is used multiple times.
     */
    function setupMeasure() {
        fastdom.measure(() => measure());
    }

    /**
     * Triggers a callback if the visibility has changed since the last frame.
     * Should be called from within a fastdom.measure to prevent layout
     * thrashing.
     */
    function measure() {
        /** @type {boolean} */
        const visibility = isVisible(element[0]);
        if (visibility !== lastVisibility) {
            lastVisibility = visibility;
            onVisibilityChange(visibility);
        }
        fastdom.mutate(() => setupMeasure());
    }
}

export default linkFn;
