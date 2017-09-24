function getOffsetParentRoot(el) {
    let parent;
    while (parent = el.offsetParent) {
        el = parent;
    }
    return el;
}

export default getOffsetParentRoot;
