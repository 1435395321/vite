<template>
    <div>
        <div class="back">
            <van-icon name="arrow-left" size="22" color="333" @click="back" />
        </div>
        <detail-header title="文化中心电影院"></detail-header>
        <div class="title">{{ filmDetail.name }}</div>
        <div class="explain" @click="serviceInfo">
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
                        <!-- <div class="swiper-slide">
                            <img
                                src="https://pic.maizuo.com/usr/movie/186370070413ba10d64a9e36264ca267.jpg"
                            />
                        </div>
                        <div class="swiper-slide">
                            <img
                                src="https://pic.maizuo.com/usr/movie/186370070413ba10d64a9e36264ca267.jpg"
                            />
                        </div>
                        <div class="swiper-slide">
                            <img
                                src="https://pic.maizuo.com/usr/movie/186370070413ba10d64a9e36264ca267.jpg"
                            />
                        </div>
                        <div class="swiper-slide">
                            <img
                                src="https://pic.maizuo.com/usr/movie/186370070413ba10d64a9e36264ca267.jpg"
                            />
                        </div> -->
                    </div>
                </div>
                <div class="three">
                    <img src="/@/assets/img/three.png" alt="" />
                </div>
            </div>
            <!-- 信息 -->
            <div class="info">
                <div class="info-left">
                    <div class="info-top">
                        <span>拆弹专家2</span>
                        <span>8分</span>
                    </div>
                    <div class="info-bottom van-ellipsis">
                        动作犯罪0分钟动作犯罪0分钟动作犯罪0分钟
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
        >
            <van-tab title="ddd"></van-tab>
            <van-tab title="ddd"></van-tab>
            <van-tab title="ddd"></van-tab>
        </van-tabs>
        <!-- 列表 -->
        <ul class="list">
            <li>
                <div>
                    <p>15:00</p>
                    <p>15:00散场</p>
                </div>
                <div>
                    <p>国语2D</p>
                    <p>5号激光厅</p>
                </div>
                <div class="color">
                    <p>￥43</p>
                </div>
                <div class="color btn">
                    <p>停售</p>
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
import { reactive, toRefs, ref, onMounted, nextTick } from "vue";
import DetailHeader from "./Detail/DetailHeader.vue";
import { useRouter, useRoute } from "vue-router";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.min.css";
import { useStore } from "vuex";
import http from "/@/utils/https";
export default {
    name: "CinmaDetail",
    components: {
        DetailHeader,
    },
    setup() {
        const router = useRouter();
        const { params } = useRoute();
        const { state,commit } = useStore();
        const data = reactive({
            filmInfo: "",
            show: false,
            active: 0,
            cinemaId: params.id,
            filmDetail: [], //影院详情
            filmeDetailList: [], //电影详情
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
        // 后退
        const back = () => {
            router.go(-1);
        };
        return {
            ...toRefs(data),
            back,
            serviceInfo,
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
    font-size: 17px;
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