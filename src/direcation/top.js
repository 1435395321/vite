export default {
    mounted(el) {
        el.style.opacity = 0;
        window.onscroll = () => {
            if( (document.body.scrollTop || document.documentElement.scrollTop) > 50 ) {
                el.style.opacity = 1
            }else {
                el.style.opacity = 0;
            }
        }
    },
    unmounted (el) {
        window.onscroll = null
    }
}