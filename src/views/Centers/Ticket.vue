<template>
    <div>Tick</div>
</template>

<script>
import { onMounted } from "vue";
import { useStore } from "vuex";
export default {
    setup() {
        const { commit } = useStore();
        onMounted(() => {
            commit("setNavTitle", "优惠券");
        });
    },
};
</script>

<style>
</style>