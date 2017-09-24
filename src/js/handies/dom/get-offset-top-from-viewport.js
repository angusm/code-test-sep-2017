import getScrollTop from './get-scroll-top';

function getOffsetTopFromViewport(el) {
    if (!el) {
        return -window.scrollY;
    } else {
        const parent = el.offsetParent;
        return el.offsetTop + getOffsetTopFromViewport(parent) +
            getScrollTop(parent);
    }
}

export default getOffsetTopFromViewport;
