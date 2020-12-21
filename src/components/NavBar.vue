<template>
    <div>
        <van-nav-bar :title="title" @click-left="onClickLeft">
            <template #left>
                <van-icon name="arrow-left" size="18" color="#333333" />
            </template>
        </van-nav-bar>
    </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
    name: "NavBar",
    props: {
        title: String,
    },
    setup(props) {
        const router = useRouter();
        const onClickLeft = () => {
            router.go(-1);
        };
        return {
            onClickLeft,
        };
    },
};
</script>

<style lang="scss" scoped>
</style>