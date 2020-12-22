<template>
    <div>
        <van-empty
            image-size="90"
            class="custom-image"
            image="/@/assets/img/empty.png"
            description="没有红包"
        />
    </div>
</template>

<script>
import { onMounted } from "vue";
import { useStore } from "vuex";
export default {
    setup() {
        const { commit } = useStore();
        onMounted(() => {
            commit("setNavTitle", "组合红包");
        });
    },
};
</script>

<style>
</style>