import getScrollTop from './get-scroll-top';

/**
 * Returns the offset top of the element from the top of the window.
 * @param {!HTMLElement} el The element whose offset top is desired.
 * @returns {number} The offset top in pixels.
 */
function getOffsetTopFromViewport(el) {
    if (!el) {
        return -window.scrollY;
    } else {
        /** @type {!HTMLElement} */
        const parent = el.offsetParent;
        return el.offsetTop + getOffsetTopFromViewport(parent) +
            getScrollTop(parent);
    }
}

export default getOffsetTopFromViewport;
