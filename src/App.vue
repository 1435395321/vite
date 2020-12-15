<template>
    <div class="app">
        <tab-bar></tab-bar>
        <router-view></router-view>
    </div>
</template>

<script>
import TabBar from "./components/TabBar.vue";
import { ref } from "vue";
export default {
    name: "App",
    components: {
        TabBar,
    },
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
