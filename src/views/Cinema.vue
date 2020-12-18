<template>
    <div>
        <van-nav-bar
            title="影院"
            @click-left="hangLeft()"
            @click-right="hangRight()"
        >
            <template #left>
                <span>{{ cityName }}</span>
                <van-icon name="arrow-down" size="12" color="#333" />
            </template>
            <template #right>
                <van-icon name="search" size="22" color="#333" />
            </template>
        </van-nav-bar>
        <van-dropdown-menu>
            <van-dropdown-item title="全城" ref="item">
                <div class="drop">
                    <div class="drop-list" v-for="(list,index) in cinemaList" :key="index">
                        <p :class="{'active': activeIdx===index}"  @click="dropListOne(index)">{{list.districtName}}</p>
                    </div>
                </div>
            </van-dropdown-item>
            <van-dropdown-item v-model="value" :options="option"/>
            <van-dropdown-item v-model="value1" :options="option1" />
        </van-dropdown-menu>
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
import { computed, nextTick, reactive, toRefs } from "vue";
import http from "/@/utils/https";
import betterScroll from "better-scroll";
import { useRouter } from "vue-router";
import { useStore, mapState } from "vuex";
export default {
    name: "Cinema",
    setup() {
        const router = useRouter();
        const data = reactive({
            height: 0,
            value: 0,
            value1: 0,
            option: [
                { text: "APP订票", value: 0 },
                { text: "前台兑换", value: 1 },
            ],
            option1: [
                { text: "最近去过", value: 0 },
                { text: "距离最近", value: 1 },
            ],
            activeIdx:0
        });
        const store = useStore();
        const cityName = store.state.cityName;
        data.height = document.documentElement.clientHeight - 148 + "px";
        if (store.state.cinemaList.length == 0) {
            store.dispatch("getCinema", store.state.cityId).then((res) => {
                nextTick(() => {
                    const better = new betterScroll(".cinema", {
                        scrollbar: {
                            fade: true,
                        },
                    });
                });
            });
        } else {
            nextTick(() => {
                const better = new betterScroll(".cinema", {
                    scrollbar: {
                        fade: true,
                    },
                });
            });
        }
        const cinemaList = computed(() => {
            return store.state.cinemaList;
        });
        const dropListOne = (value) => {
            data.activeIdx = value
        }

        //地址跳转
        const hangLeft = () => {
            // 清空cinemaList
            store.commit("cinemaEmpty");
            router.push("/city");
        };
        // 搜索跳转
        const hangRight = () => {
            router.push("/cinema/search");
        };
        return {
            cinemaList,
            cityName,
            ...toRefs(data),
            hangLeft,
            hangRight,
            dropListOne
        };
    },
};
</script>
<style lang="scss">
.van-dropdown-menu__bar {
    z-index: 99;
}
</style>
<style lang="scss" scoped>
.cinema {
    position: relative;
}
.drop {
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    box-sizing: border-box;

    .drop-list {
        width: 20%;
        margin-right: 5%;
        margin-bottom: 5px;

        p {
            padding: 5px;
            border: 1px solid #ccc;
            text-align: center;
            font-size: 13px;
            color: rgb(95, 95, 95);
        }
        .active {
            border: 1px solid rgb(241, 110, 110);
            color:rgb(241, 110, 110);
        }
        &:nth-child(4n) {
            margin-right: 0;
        }
    }
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