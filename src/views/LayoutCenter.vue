<template>
    <div>
        <my-nav-bar :title="navtitle"></my-nav-bar>
        <router-view></router-view>
    </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import { useStore } from "vuex";
import { computed, onMounted, onUnmounted, ref } from "vue";
export default {
    components: {
        "my-nav-bar": NavBar,
    },
    setup() {
        const { state, commit } = useStore();
        const navtitle = state.navTitle;
        const title = computed(() => {
            return state.navTitle
        })
        onMounted(() => {
            commit("hideTab");
        });
        onUnmounted(() => {
            commit('showTab')
        })
        return {
            navtitle,
        };
    },
};
</script>