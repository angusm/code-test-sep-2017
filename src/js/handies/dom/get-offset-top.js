function getOffsetTop(el) {
    if (!!el) {
        return el.offsetTop + getOffsetTop(el.offsetParent);
    } else {
        return 0;
    }
}

export default getOffsetTop;
