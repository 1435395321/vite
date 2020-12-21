<template>
    <div>
        <img class="img" src="/@/assets/img/logo.jpg">
        <van-form @submit="onSubmit">
            <van-field
                v-model="username"
                name="用户名"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px">
                <van-button square block type="warning" native-type="submit"
                    >提交</van-button
                >
            </div>
        </van-form>
    </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from 'vuex'
export default {
    name: "Login",
    setup() {
        const state = reactive({
            username: "wang",
            password: "pass",
        });
        const router = useRouter(),
              store = useStore();
        const onSubmit = (values) => {
            const token = '123456789'
            store.commit('setToken',token);
            router.push('/film')
        };
        return {
            ...toRefs(state),
            onSubmit,
        };
    },
};
</script>

<style lang="scss" scoped>
.img{
    width:80px;
    height: 80px;
    display:block;
    margin:40px auto;
}
</style>