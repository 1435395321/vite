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
import { ref } from "vue";
import { mapState } from "vuex";
export default {
    name: "App",
    components: {
        TabBar,
    },
    computed: mapState({
        isShowTab: (state) => state.isShowTab,
    }),
    setup() {
        const curIdx = ref(0);
        const handlTab = (e) => {
            const tar = e.target;
            const className = tar.className;
            if (className === "item-btn") {
                const index = tar.dataset.index;
                curIdx.value = parseInt(index);
            }
        };
        return {
            handlTab,
            curIdx,
        };
    },
};
</script>
<style lang="scss" scope>
</style>
