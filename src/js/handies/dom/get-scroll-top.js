function getScrollTop(el) {
    if (!!el) {
        return el.scrollTop;
    } else {
        return 0;
    }
}

export default getScrollTop;
