<template>
    <div>
        <form action="/" class="search">
            <van-search
                v-model="value"
                show-action
                placeholder="请输入搜索关键词"
                @cancel="onCancel"
            />
        </form>
        <ul v-if="computedCinemaList.length>0">
            <li v-for="item in computedCinemaList" :key="item.seatFlag">
                <div class="top common">
                    <p>{{ item.name }}</p>
                    <p class="price">{{ item.lowPrice }}起</p>
                </div>
                <div class="bottom common">
                    <p class="address van-ellipsis">{{ item.address }}</p>
                    <p>距离未知</p>
                </div>
            </li>
        </ul>
        <!-- 搜索提示 -->
        <div v-else>
            <van-empty image="search" description="输入要搜索的数据" />
        </div>
    </div>
</template>

<script>
import { computed, reactive, toRefs } from "vue";
import { mapState, useStore } from "vuex";
import { Notify } from 'vant'
import { useRouter } from "vue-router";
export default {
    name: "Search",
    setup() {
        const store = useStore(),
              router = useRouter();
        const state = reactive({
            value: "",
        });
        if (store.state.cinemaList.length == 0) {
            store.dispatch("getCinema", store.state.cityId);
        }
        const onCancel = () => {
            router.replace('/cinema')
        };
        const computedCinemaList = computed(() => {
            if( state.value ==='' ) return [];
            return store.state.cinemaList.filter((item) =>
                item.name.toUpperCase().includes(state.value.toUpperCase().trim()) || item.address.toUpperCase().includes(state.value.toUpperCase().trim())
            );
        });
        return {
            computedCinemaList,
            ...toRefs(state),
            onCancel,
        };
    },
};
</script>

<style lang="scss" scoped>
.search{
    position: sticky;
    top: 0;
    background: #fff;
    z-index: 2;
}
.cinema {
    position: relative;
}
ul {
    width: 100%;
    overflow: hidden;
    li {
        padding: 15px;
        position: relative;
        .common {
            display: flex;
            justify-content: space-between;
            font-size: 15px;
            .price {
                color: rgb(233, 163, 59);
            }
            .address {
                width: 70%;
            }
        }
        .bottom {
            font-size: 12px;
            margin-top: 10px;
            color: rgba(105, 105, 105, 1);
        }
        &::after {
            content: "";
            width: 100%;
            height: 1px;
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            border-bottom: 1px solid #ededed;
        }
    }
}
</style>