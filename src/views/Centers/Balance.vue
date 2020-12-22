<template>
    <div>
        <div class="top">
            <p>当前余额</p>
            <p>￥ 0.00</p>
        </div>
        <van-empty
            image-size="90"
            class="custom-image"
            image="/@/assets/img/empty.png"
            description="暂无余额使用明细"
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
            commit("setNavTitle", "余额明细");
        });
    },
};
</script>

<style lang="scss" scoped>
.top{
    width: 100%;
    height: 160px;
    background: #ff7126;
    padding-top: 12%;
    box-sizing: border-box;
    p{
        font-size: 14px;
        text-align: center;
        color: #fff;
    }
    & p:last-child{
        font-size: 24px;
    }
}
</style>