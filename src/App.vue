<template>
    <div class="app">
        <tab-bar></tab-bar>
        <router-view></router-view>
    </div>
</template>

<script>
import TabBar from "./components/TabBar.vue";
export default {
    name: "App",
    components: {
        TabBar,
    },
    setup() {
    }
};
</script>
<style lang="scss" scope>
</style>
