<template>
    <div>
        <van-index-bar :index-list="plus">
            <div v-for="data in cityList" :key="data.type">
                <van-index-anchor :index="data.type"></van-index-anchor>
                <van-cell
                    :title="item.name"
                    v-for="(item, index) in data.list"
                    :key="index"
                    @click="hanglCity(item.name,item.cityId)"
                ></van-cell>
            </div>
        </van-index-bar>
    </div>
</template>

<script>
import { computed, reactive, toRefs } from "vue";
import Http from "/@/utils/https";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
    setup() {
        const state = reactive({
            cityList: [],
        });
        const store = useStore();
        const router = useRouter();
        Http({
            url: "gateway?k=8048085",
            headers: {
                "X-Host": "mall.film-ticket.city.list",
            },
        }).then((res) => {
            let data = res.data.data.cities;
            disposeCity(data);
        });
        const disposeCity = (city) => {
            let fromCode = [];
            // 定义26英文字母
            for (let i = 65; i < 91; i++) {
                fromCode.push(String.fromCharCode(i));
            }
            //循环26字母
            fromCode.forEach((letter) => {
                //每一组英文字母下的值
                let list = city.filter((item) => {
                   return  item.pinyin.substring(0, 1).toUpperCase() === letter
                });
                //如果字母下值不为空 数据处理 放入state
                if (list.length > 0) {
                    state.cityList.push({
                        type: letter,
                        list: list,
                    });
                }
            });
        };
        // 计算属性
        const plus = computed(() => {
            return state.cityList.map((item) => {
                return item.type
            })
        });
        // 返回记录城市
        const hanglCity = (name, cityId) => {
            const data = {
                name, cityId
            }
            store.commit('changCityName', data);
            router.back(-1)
        }
        return {
            plus,
            ...toRefs(state),
            hanglCity,
        };
    },
};
</script>

<style lang="scss">
.van-toast--html, .van-toast--text {
    min-width: 0 !important;
}
</style>