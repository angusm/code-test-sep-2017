function getOffsetTop(el) {
    return !!el ? el.offsetTop + getOffsetTop(el.offsetParent) : 0;
}

export default getOffsetTop;
