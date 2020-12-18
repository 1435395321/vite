<template>
    <div class="app">
        <section>
            <router-view></router-view>
        </section>
        <tab-bar v-show="isShowTab"></tab-bar>
    </div>
</template>

<script>
import TabBar from "./components/TabBar.vue";
import { computed, ref } from "vue";
import { useStore, mapState } from "vuex";
export default {
    name: "App",
    components: {
        TabBar,
    },
    // computed: mapState({
    //     isShowTab: (state) => state.isShowTab,
    // }),
    setup() {
        const curIdx = ref(0);
        const store = useStore();
        const handlTab = (e) => {
            const tar = e.target;
            const className = tar.className;
            if (className === "item-btn") {
                const index = tar.dataset.index;
                curIdx.value = parseInt(index);
            }
        };
        const isShowTab = computed (() => {
            return store.state.isShowTab
        })
        return {
            handlTab,
            curIdx,
            isShowTab
        };
    },
};
</script>
<style lang="scss" scope>
 *{
    //  解决三百毫秒
    touch-action: manipulation;
 }
</style>
