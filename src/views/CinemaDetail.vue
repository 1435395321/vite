<template>
    <div>
        <div class="back">
            <van-icon name="arrow-left" size="22" color="333" @click="back" />
        </div>
        <detail-header :title="filmDetail.name"></detail-header>
        <div class="title">{{ filmDetail.name }}</div>
        <div class="explain" @click="serviceInfo" v-if="filmDetail.services">
            <p v-for="(item, index) in filmDetail.services" :key="index">
                {{ item.name }}
            </p>
            <van-icon name="arrow" size="12"></van-icon>
        </div>
        <!-- 地址 -->
        <div class="address">
            <van-icon name="location-o" size="22" />
            <p class="van-ellipsis">
                {{ filmDetail.address }}
            </p>
            <van-icon name="phone-o" size="22" />
        </div>
        <!-- 电影 -->
        <div>
            <div class="films">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div
                            class="swiper-slide"
                            v-for="(item, index) in filmeDetailList"
                            :key="index"
                        >
                            <img :src="item.poster" />
                        </div>
                    </div>
                </div>
                <div class="three">
                    <img src="/@/assets/img/three.png" />
                </div>
            </div>
            <!-- 信息 -->
            <div class="info" @click="filmeDetail(filmeDetailOne.filmId)">
                <div class="info-left">
                    <div class="info-top">
                        <span>{{ filmeDetailOne.name }} </span>
                        <span>{{ filmeDetailOne.grade }}分</span>
                    </div>
                    <div class="info-bottom van-ellipsis">
                        {{ filmeDetailOne.category }}|
                        {{ filmeDetailOne.runtime }}分钟 | 
                        <span v-for="(item,index) in filmeDetailOne.actors" :key="index">
                            {{item.name}}
                        </span>
                    </div>
                </div>
                <div class="info-right">
                    <van-icon name="arrow" size="12"></van-icon>
                </div>
            </div>
        </div>

        <!-- 日期选项卡 -->
        <van-tabs
            v-model:active="active"
            swipeable
            background="white"
            title-active-color="#ff5f16"
            style="z-index: 9"
            :ellipsis="false"
            line-width="90px"
            @click="getFilmSiteList"
        >
            <!-- 零是轮播图下表 -->
            <van-tab
                :title="item"
                v-for="(item, index) in filmeDetailDate[0]"
                :key="index"
            ></van-tab>
        </van-tabs>
        <!-- 列表 -->
        <ul class="list">
            <li v-for="(item, index) in filmSiteList" :key="index">
                <div>
                    <p>{{ item.showAt }}</p>
                    <p>{{ item.endAt }}散场</p>
                </div>
                <div class="list-text">
                    <p>{{ item.filmLanguage }}{{ item.imagery }}</p>
                    <p>{{ item.hallName }}</p>
                </div>
                <div class="color">
                    <p>￥{{ item.salePrice }}</p>
                </div>
                <div class="color btn" v-if="item.isOnsell" @click="buy(item.scheduleId)">
                    <p>购票</p>
                </div>
                <div class="color btn" v-else>
                    <p>停购</p>
                </div>
            </li>
        </ul>
        <van-action-sheet v-model:show="show" title="标题">
            <div
                class="content"
                v-for="(item, index) in filmDetail.services"
                :key="index"
            >
                <div class="content-text">
                    <p>{{ item.name }}:</p>
                    <p>{{ item.description }}</p>
                </div>
            </div>
        </van-action-sheet>
    </div>
</template>

<script>
import { reactive, toRefs, ref, onMounted, nextTick, onUnmounted } from "vue";
import DetailHeader from "./Detail/DetailHeader.vue";
import { useRouter, useRoute } from "vue-router";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.min.css";
import { useStore } from "vuex";
import http from "/@/utils/https";
import { format } from "date-fns";
export default {
    name: "CinmaDetail",
    components: {
        DetailHeader,
    },
    setup() {
        const router = useRouter();
        const { params } = useRoute();
        const { state, commit } = useStore();
        const data = reactive({
            filmInfo: "",
            show: false,
            active: 0,
            cinemaId: params.id,
            filmDetail: [], //影院详情
            filmeDetailList: [], //电影详情
            filmeDetailOne: [], //电影详情一条数据
            filmeDetailDate: [],
            filmSiteList: [], //电影场列表
        });

        onMounted(() => {
            // 轮播swiper使用
            commit("hideTab");
            getFilmInfo();
            getfilmeDetailList();
        });

        const getFilmInfo = () => {
            http({
                url: `gateway/?cinemaId=${data.cinemaId}&k=3606708`,
                headers: {
                    "X-Host": "mall.film-ticket.cinema.info",
                },
            }).then((res) => {
                data.filmInfo = res.data.data.cinema.name;
                data.filmDetail = res.data.data.cinema;
            });
        };
        const getfilmeDetailList = () => {
            http({
                url: `gateway/?cinemaId=${data.cinemaId}&k=3606708`,
                headers: {
                    "X-Host": "mall.film-ticket.film.cinema-show-film",
                },
            }).then((res) => {
                data.filmeDetailList = res.data.data.films;
                filmeDetailOne(0);
                getFilmSiteList(0);
                data.filmeDetailList.forEach((item) => {
                    let arr = [];
                    item.showDate.forEach((list) => {
                        arr.push(format(new Date(list * 1000), "周c MM月dd日"));
                    });
                    data.filmeDetailDate.push(arr);
                });
                nextTick(() => {
                    const swiper = new Swiper(".swiper-container", {
                        slidesPerView: 4,
                        spaceBetween: 30,
                        centeredSlides: true,
                    });
                });
            });
        };
        // 注意事项
        const serviceInfo = () => {
            data.show = true;
        };
        // e 轮播图的下标 电影的单条数据
        const filmeDetailOne = (e) => {
            data.filmeDetailOne = data.filmeDetailList[e];
        };
        // 电影城列表
        const getFilmSiteList = (e) => {
            let date = data.filmeDetailList[0].showDate;
            http({
                url: `gateway/?filmId=${data.filmeDetailOne.filmId}&cinemaId=${data.cinemaId}&date=${date[e]}&k=9346258`,
                headers: {
                    "X-Host": "mall.film-ticket.schedule.list",
                },
            }).then((res) => {
                data.filmSiteList = res.data.data.schedules;
                data.filmSiteList.forEach((item) => {
                    item.showAt = format(new Date(item.showAt * 1000), "HH:mm");
                    item.endAt = format(new Date(item.endAt * 1000), "HH:mm");
                    item.salePrice = item.salePrice / 100;
                });
            });
        };
        // 购买
        const buy = (e) => {
            router.push(`/schedule/${e}`)
        }
        const filmeDetail = (id) => {
            router.push(`/detail/${id}`)
        }
        // 后退
        const back = () => {
            router.go(-1);
        };
        onUnmounted(() => {
           commit('showTab')
        })
        return {
            ...toRefs(data),
            back,
            serviceInfo,
            getFilmSiteList,
            filmeDetail,
            buy
        };
    },
};
</script>

<style scoped lang="scss">
.back {
    margin: 10px 0 0 10px;
}
.title {
    text-align: center;
    color: rgb(50, 50, 51);
    font-weight: 500;
    font-size: 16px;
}
.explain {
    text-align: center;
    font-size: 12px;
    color: #ffb232;
    display: flex;
    justify-content: center;
    margin-top: 15px;
    p {
        padding: 0px 5px;
        border-style: none solid solid none;
        border-width: 1px;
        border-color: #ffb232;
        margin-right: 5px;
        &:nth-last-child(2) {
            border-style: none none solid solid;
        }
    }
    i {
        padding-top: 2px;
    }
}
.address {
    height: 50px;
    border-top: 1px solid #ededed;
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
        width: 80%;
        font-size: 14px;
    }
    i {
        padding: 10px;
    }
}
.films {
    height: 150px;
    padding: 10px 0;
    background: #ffb232;
    .three {
        margin: 25px auto;
        font-size: 0;
        width: 20px;
        img {
            width: 20px;
            height: 10px;
        }
    }
}
.swiper-container {
    margin-top: 16px;
}
.swiper-wrapper {
    display: flex;
    align-items: baseline;
    .swiper-slide {
        img {
            width: 90px;
            height: 105px;
        }
    }
    .myactive {
        img {
            height: 130px;
        }
    }
}
.info {
    height: 80px;
    border-bottom: 1px solid #ededed;
    padding: 15px 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .info-left {
        width: 85%;
        margin-left: 10%;
        .info-top {
            font-size: 15px;
            text-align: center;
            margin-bottom: 7px;
            span {
                margin-right: 5px;
                &:last-child {
                    color: chocolate;
                }
            }
        }
        .info-bottom {
            width: 100%;
            color: #797d82;
            font-size: 13px;
            text-align: center;
            span{
                margin-right: 3px;
            }
        }
    }
}
.list {
    width: 100%;
    li {
        border-top: 1px solid #ededed;
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 74px;
        font-size: 15px;
        div {
            & p:nth-child(2) {
                color: #ccc;
                font-size: 13px;
            }
        }
        .color {
            color: chocolate;
        }
        .btn {
            padding: 3px;
            border: 1px solid chocolate;
        }
        .list-text{
            width: 40%;
        }
    }
}
.content {
    padding: 16px 16px 16px;
    .content-text {
        display: flex;
        justify-content: space-around;
        width: 90%;
        margin: 0 auto;
        & p:first-child {
            font-size: 10px;
            color: #ffb232;
            width: 20%;
        }
        & p:last-child {
            font-size: 14px;
            width: 90%;
        }
    }
}
</style>