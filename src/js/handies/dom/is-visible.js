import getOffsetTopFromViewport from './get-offset-top-from-viewport';
import isInRange from '../functions/is-in-range';

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