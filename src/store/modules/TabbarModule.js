const module = {
    namespaced: true,
    state: {
        isShowTab: true,
    },
    mutations: {
        hideTab(state) {
            state.isShowTab = false;
        },
        showTab(state) {
            state.isShowTab = true
        },
    },
    actions: {}
}
export default module