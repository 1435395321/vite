<template>
    <div>
        <van-empty
            image-size="90"
            class="custom-image"
            image="/@/assets/img/empty1.png"
        />
        <van-button class="button" size="small" @click="hangleClick" block plain type="warning">激活新券</van-button>
    </div>
</template>

<script>
import { onMounted } from "vue";
import { useStore } from "vuex";
import { Notify } from 'vant';
export default {
    setup() {
        const { commit } = useStore();
        onMounted(() => {
            commit("setNavTitle", "优惠券");
        });
        const hangleClick = () => {
            Notify({
                type:'warning',
                message:"暂未开放"
            })
        }
        return{
            hangleClick
        }
    },
};
</script>
<style lang="scss" scoped>
.button{
    width: 30%;
    margin: 0 auto;
}
</style>