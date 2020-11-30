<template>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(image, index) in images" :key="index">
            <img :src="image"  />
        </van-swipe-item>
    </van-swipe>
</template>

<script>
import { reactive, ref, toRefs} from "vue";
export default {
    name: "Pager",
    setup() {
        const data = reactive({
            images: [
                "https://static.maizuo.com/v5/upload/189bcf606b4bf49ad5de201a2ea5024d.jpg?x-oss-process=image/quality,Q_70",
                "https://static.maizuo.com/v5/upload/5100685994355867508ef520654bec7c.jpg",
            ],
        });
        return {
            ...toRefs(data)
        };
    },
};
</script>

<style lang="scss" scoped>
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    text-align: center;
    width: 100%;
    height: 200px;
    img{
        width: 100%;
    }
}
</style>