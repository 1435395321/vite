<template>
    <div>
        <van-button class="button" size="large" block type="primary" @click="backLogin">退出登录</van-button>
    </div>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
    name: "Setting",
    setup() {
        const { commit } = useStore();
        const router = useRouter();
        onMounted(() => {
            commit("setNavTitle", "设置");
        });

        const backLogin = () => {
            commit("backLogin");
            router.back(-1);
        };
        return {
            backLogin,
        };
    },
};
</script>

<style lang="scss" scoped>
.button{
    margin: 25px auto;
    width: 60%;
}
</style>