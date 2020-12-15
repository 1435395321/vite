export default {
    mounted(el, binding) {
        const {
            activeClass,
            className,
            curIdx
        } = binding.value;
        const oItemBtns = el.getElementsByClassName(className);
        oItemBtns[curIdx].className += ` ${activeClass}`
    },
    updated(el, binding) {
        const oldCurIdx = binding.oldValue.curIdx;
        const {
            activeClass,
            className,
            curIdx
        } = binding.value;
        const oItemBtns = el.getElementsByClassName(className);
        oItemBtns[oldCurIdx].className = className;
        oItemBtns[curIdx].className += ` ${activeClass}`
    }
}