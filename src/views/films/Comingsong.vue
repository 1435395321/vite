<template>
    <div>
        <van-card
            v-for="item in listData"
            :key="item.filmId"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
        >
            <template #tags>
                <van-tag plain type="danger">标签</van-tag>
                <van-tag plain type="danger">标签</van-tag>
            </template>
            <template #footer>
                <van-button size="small" plain type="warning">购买</van-button>
            </template>
        </van-card>
    </div>
</template>

<script>
import { defineComponent, toRefs, reactive } from "vue";
import { RfilmList } from "../../api/film";
export default defineComponent({
    name: "Comingsong",
    setup() {
        const data = reactive({
            listData: [],
        });
        RfilmList().then((res) => {
            data.listData = res.data.films;
        });
        return {
            ...toRefs(data),
        };
    },
});
</script>

<style lang="scss" scope>
</style>