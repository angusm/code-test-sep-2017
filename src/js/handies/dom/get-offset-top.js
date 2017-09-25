/**
 * Returns the offset top of the element from the top of the document.
 * @param {?HTMLElement} el Element whose offset top is desired.
 * @returns {number} The offset top from the document top in pixels.
 */
function getOffsetTop(el) {
    if (!!el) {
        return el.offsetTop + getOffsetTop(el.offsetParent);
    } else {
        return 0;
    }
}

export default getOffsetTop;
