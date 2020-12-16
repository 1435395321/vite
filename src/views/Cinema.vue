<template>
    <div>
        <van-nav-bar title="影院" @click-left="hangleft()">
            <template #left>
                <span>{{cityName}}</span>
                <van-icon name="arrow-down" size="12" color="#333"/>
            </template>
            <template #right>
                <van-icon name="search" size="22" color="#333"/>
            </template>
        </van-nav-bar>
        <div class="cinema" :style="{ height: height }">
            <ul>
                <li v-for="item in cinemaList" :key="item.seatFlag">
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
        </div>
    </div>
</template>

<script>
import { nextTick, reactive, toRefs } from "vue";
import http from "/@/utils/https";
import betterScroll from "better-scroll";
import { useRouter } from 'vue-router'
import { useStore } from "vuex";
export default {
    name: "Cinema",
    setup() {
        const router = useRouter();
        const data = reactive({
            cinemaList: [],
            height: 0,
        });
        const store = useStore();
        const cityName = store.state.cityName;
        data.height = document.documentElement.clientHeight -50 + "px";
        http({
            url: `gateway?cityId=${store.state.cityId}&ticketFlag=1&k=471474`,
            headers: {
                "X-Host": "mall.film-ticket.cinema.list",
            },
        }).then((res) => {
            data.cinemaList = res.data.data.cinemas;
            nextTick(() => {
                const better = new betterScroll(".cinema", {
                    scrollbar: {
                        fade: true,
                    },
                });
            });
        });
        //地址跳转
        const  hangleft = () => {
            router.push('/city')
        }
        return {
            cityName,
            ...toRefs(data),
            hangleft
        };
    },
};
</script>

<style lang="scss" scoped>
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