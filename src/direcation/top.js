export default {
    mounted(el) {
        el.style.display = "none";
        window.onscroll = () => {
            if ((document.body.scrollTop || document.documentElement.scrollTop) > 50) {
                el.style.display = "block"
            } else {
                el.style.display = "none";
            }
        }
    },
    unmounted(el) {
        window.onscroll = null
    }
}