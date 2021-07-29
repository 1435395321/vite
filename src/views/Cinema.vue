<template>
    <div>
        <!-- 头部导航 -->
        <van-nav-bar
            title="影院"
            @click-left="hangLeft(filmid)"
            @click-right="hangRight()"
        >
            <template #left v-if="filmid === ''">
                <span>{{ cityName }}</span>
                <van-icon name="arrow-down" size="12" color="#333"/>
            </template>
            <template #left v-else>
                <van-icon name="arrow-left" size="22" color="#333"/>
            </template>
            <template #right>
                <van-icon name="search" size="22" color="#333"/>
            </template>
        </van-nav-bar>
        <!-- 日期选项卡 -->
        <van-tabs
            v-model:active="active"
            swipeable
            background="white"
            v-if="filmid"
            title-active-color="#ff5f16"
            style="z-index: 9"
            :ellipsis="false"
            line-width="90px"
            @click="hangleDate"
        >
            <van-tab
                :title="item.showDate"
                v-for="(item, index) in dateList.showCinemas"
                :key="index"
            ></van-tab>
        </van-tabs>
        <!-- 下拉单 -->
        <van-dropdown-menu>
            <van-dropdown-item :title="areaName" ref="item">
                <div class="drop">
                    <div
                        class="drop-list"
                        v-for="(list, index) in areaList"
                        :key="index"
                    >
                        <p
                            :class="{ active: activeIdx === index }"
                            @click="dropListOne(index, list)"
                        >
                            {{ list }}
                        </p>
                    </div>
                </div>
            </van-dropdown-item>
            <van-dropdown-item
                v-model="value"
                :options="option"
                @change="conversionChange"
            />
            <van-dropdown-item v-model="value1" :options="option1"/>
        </van-dropdown-menu>
        <div class="cinema" :style="{ height: height }">
            <ul>
                <li
                    v-for="(item, index) in cinemaList"
                    :key="index"
                    @click="cinmaDetail(item.cinemaId)"
                >
                    <div class="top common">
                        <p>{{ item.name }}</p>
                        <p class="price">{{ item.lowPrice }}起</p>
                    </div>
                    <div class="bottom common">
                        <p class="address van-ellipsis">
                            {{ item.address }}
                        </p>
                        <p>距离未知</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { computed, nextTick, reactive, toRefs, ref, onMounted } from "vue";
import http from "/@/utils/https";
import betterScroll from "better-scroll";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { arrayToHeavy } from "/@/components/common";
import { format } from "date-fns";
import { week } from "/@/components/date";

export default {
    name: "Cinema",
    setup() {
        const router = useRouter();
        const { params } = useRoute();
        const store = useStore();
        const item = ref(null);
        const data = reactive({
            filmid: params.id,
            cityName: store.state.cityName,
            active: 0,
            height: document.documentElement.clientHeight - 150 + "px",
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
            activeIdx: 0,
            arr: [],
            areaName: "全城",
            dateList: [],
            cinemaDateList: [],
            paramDate: {},
        });
        onMounted(() => {
            if (data.filmid) {
                store.commit("hideTab");
            }
            getCinemaList();
            getDateList();
        });
        // 判断是否请求数据
        const getCinemaList = () => {
            const param = { cityId: store.state.cityId, index: 1 };
            store.dispatch("getCinema", param).then((res) => {
                // better 优化流畅加载大数量数据
                nextTick(() => {
                    const better = new betterScroll(".cinema", {
                        scrollbar: {
                            fade: true,
                        },
                        click: true,
                    });
                });
            });
        };

        // 请求实现选项卡数据
        const getDateList = () => {
            if (data.filmid) {
                http({
                    url: `gateway/?filmId=${data.filmid}&cityId=${store.state.cityId}&k=8031962`,
                    headers: {
                        "X-Host": "mall.film-ticket.cinema.film-show-cinema",
                    },
                }).then((res) => {
                    data.dateList = res.data.data;
                    // 日期转换格式
                    data.dateList.showCinemas.forEach((item) => {
                        let set = format(
                            new Date(item.showDate * 1000),
                            "周c MM月dd日"
                        );
                        item.showDate = week(set);
                        data.cinemaDateList.push(item.cinemaList);
                    });
                    // 再次请求默认赋值请求日期当天的数据
                    data.paramDate = {
                        id: store.state.cityId,
                        cinemaIds: data.cinemaDateList[0],
                    };
                    store.dispatch("postDateList", data.paramDate);
                });
            }
        };

        // 日期点击获取
        const hangleDate = (name) => {
            data.paramDate = {
                id: store.state.cityId,
                cinemaIds: data.cinemaDateList[name],
            };
            console.log(data.paramDate);
            store.dispatch("postDateList", data.paramDate);
        };
        const dropListOne = (value, list) => {
            // 赋值 选中
            data.activeIdx = value;
            // 赋值
            data.areaName = list;
            // 选择关闭
            item.value.toggle();
        };

        // 区域筛选
        // 全程下拉单赋值
        const areaList = computed(() => {
            cinemaList.value.forEach((item) => {
                data.arr.push(item.districtName);
                data.arr.unshift("全城");
            });
            return arrayToHeavy(data.arr);
        });

        // 第二个下拉单事件
        const conversionChange = (value) => {
            let index = value + 1;
            let data = { cityId: store.state.cityId, index };
            store.dispatch("getCinema", data);
        };

        // 计算 电影院列表
        const cinemaList = computed(() => {
            // 搜索全部
            if (data.areaName == "全城") {
                return store.state.cinemaList;
            } else {
                // 下拉搜索
                return store.state.cinemaList.filter((item) =>
                    item.districtName.includes(data.areaName)
                );
            }
        });

        //地址跳转
        const hangLeft = (e) => {
            if (e == "") {
                store.commit("cinemaEmpty");
                router.push("/city");
            } else {
                router.go(-1);
            }
        };

        // 电影院列表详情
        const cinmaDetail = (e) => {
            router.push(`/cinema/cinemadetail/${e}`);
        };

        // 搜索跳转
        const hangRight = () => {
            router.push("/cinema/search");
        };

        return {
            cinemaList,
            ...toRefs(data),
            hangLeft,
            hangRight,
            dropListOne,
            areaList,
            item,
            conversionChange,
            cinmaDetail,
            hangleDate,
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
    padding: 10px 0 0 20px;
    display: flex;
    // justify-content: space-between;
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
            color: rgb(241, 110, 110);
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