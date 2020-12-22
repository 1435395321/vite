<template>
    <div>
        <van-nav-bar :title="title" @click-left="onClickLeft">
            <template #left>
                <van-icon name="arrow-left" size="22" color="#333333" />
            </template>
        </van-nav-bar>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from "vue-router";
import {useStore} from 'vuex'
export default {
    name: "NavBar",
    setup() {
        const {state} = useStore();
        const router = useRouter();
        const title = computed(()=> {
            return state.navTitle
        })
        const onClickLeft = () => {
            router.go(-1);
        };
        return {
            title,
            onClickLeft,
        };
    },
};
</script>

<style lang="scss" scoped>
</style>