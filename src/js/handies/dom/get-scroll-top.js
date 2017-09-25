/**
 * Returns the scroll top position of the given element. 0 if none is given.
 * @param {?HTMLElement} el The element whose scroll top is desired.
 * @returns {number} The scroll top position of the element.
 */
function getScrollTop(el) {
    if (!!el) {
        return el.scrollTop;
    } else {
        return 0;
    }
}

export default getScrollTop;
