import { createStore } from 'vuex';
import state from './state'
import mutations from './mutations'
import actions from './actions'
// 让vuex 持久化的插件
import createPersistedState from 'vuex-persistedstate'
export default createStore({
    plugins:[createPersistedState()],
    state,
    mutations,
    actions,
    modules: {}
})