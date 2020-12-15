<template>
    <div v-if="filmInfo" class="warp">
        <detail-header :title="filmInfo.name"></detail-header>
        <div
            class="img"
            :style="{ backgroundImage: 'url(' + filmInfo.poster + ')' }"
        ></div>
        <h3>{{ filmInfo.name }}-{{ filmInfo.filmType.name }}</h3>
        <div>{{ filmInfo.category }}</div>
        <div>{{ filmInfo.premiereAt }}</div>
        <div>{{ filmInfo.nation }} | {{ filmInfo.runtime }}分钟</div>
        <div :class="isShow ? 'synopsisShow' : 'synopsis'">
            {{ filmInfo.synopsis }}
        </div>
        <div class="icon">
            <van-icon
                @click="more"
                :name="isShow ? 'arrow-up' : 'arrow-down'"
            />
        </div>
        <h4 class="action">演职人员</h4>
        <van-swipe :loop="false" :width="130" :show-indicators="false">
            <van-swipe-item
                v-for="(item, index) in filmInfo.actors"
                class="swipe"
                :key="index"
            >
                <img class="swiper-img" :src="item.avatarAddress" />
                <div class="swiper-text">{{ item.name }}</div>
                <div class="swiper-text">{{ item.role }}</div>
            </van-swipe-item>
        </van-swipe>
        <h4 class="action">剧照</h4>
        <van-swipe :loop="false" :width="130" :show-indicators="false">
            <van-swipe-item
                v-for="(item, index) in filmInfo.photos"
                class="swipe"
                :key="index"
            >
                <img class="swiper-img" :src="item" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>
<script>
import {
    onMounted,
    getCurrentInstance,
    ref,
    computed,
    reactive,
    toRefs,
} from "vue";
import { useRoute } from "vue-router";
import http from "/@/utils/https";
import DetailHeader from "./Detail/DetailHeader.vue";
export default {
    name: "Detail",
    components: {
        DetailHeader,
    },
    setup() {
        const route = useRoute();
        const id = route.params.myid;
        const data = reactive({
            isShow: false,
            filmInfo: null,
        });
        http({
            url: `gateway?filmId=${id}&k=4729349`,
            headers: {
                "X-Host": " mall.film-ticket.film.info",
            },
        }).then((res) => {
            data.filmInfo = res.data.data.film;
            let date = new Date(parseInt(res.data.data.film.premiereAt) * 1000);
            res.data.data.film.premiereAt = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        });
        // 点击加载更多
        const more = () => {
            if (data.isShow == true) {
                data.isShow = false;
            } else {
                data.isShow = true;
            }
        };
        return {
            ...toRefs(data),
            more,
        };
    },
};
</script>
<style scoped lang="scss">
.warp {
    padding: 0 10px;
}
.img {
    height: 200px;
    background-size: cover;
    background-position: center;
}
.synopsis {
    height: 38px;
    font-size: 14px;
    overflow: hidden;
    transition: 0.5s ease;
    opacity: 0.5;
}
.synopsisShow {
    height: 155px;
    opacity: 0.5;
    font-size: 14px;
    transition: 0.5s ease;
}
.icon {
    text-align: center;
}

.swiper-text {
    text-align: center;
}

.swiper-img {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    display: block;
}
.action {
    margin: 5px 0;
}
</style>
