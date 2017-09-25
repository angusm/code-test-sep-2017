import getOffsetTopFromViewport from './get-offset-top-from-viewport';
import isInRange from '../functions/is-in-range';

/**
 * Determines whether the given element is visible in the current window.
 * @param {!HTMLElement} el Element in question.
 * @returns {boolean} Whether the given element is visible in the window.
 */
function isVisible(el) {
    const top = getOffsetTopFromViewport(el);
    const bottom = top + el.offsetHeight;
    const viewportTop = window.scrollY;
    const viewportBottom = window.scrollY + window.innerHeight;
    const isTopVisible = isInRange(top, viewportTop, viewportBottom);
    const isBottomVisible = isInRange(bottom, viewportTop, viewportBottom);

    return isTopVisible || isBottomVisible;
}

export default isVisible;