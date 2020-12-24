<template>
    <header>
        <van-nav-bar class="a" :title="title" @click-left="onClickLeft" v-top>
            <template #left>
                <van-icon name="arrow-left" size="22" color="#333333" class="left" />
            </template>
        </van-nav-bar>
    </header> 
</template>

<script>
import { top } from "/@/direcation";
import { useRouter } from "vue-router";
export default {
    directives: {
        top
    },
    props:['title'],
    setup() {
        const router = useRouter();
        const onClickLeft = () => {
            router.go(-1);
        };
        return{
            onClickLeft
        }
    }
};
</script>

<style scoped lang="scss">
    .a{
        width: 100%;
        background: #fff;
        position: fixed;
        top: 0;
        text-align: center;
        line-height: 30px;
        transition: .5s;
    }
    .left{
        margin-left: -7px;
    }
</style>