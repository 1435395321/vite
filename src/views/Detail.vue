<template>
    <div v-if="filmInfo">
        <detail-header :title="filmInfo.name"></detail-header>
        <div
            class="img"
            :style="{ backgroundImage: 'url(' + filmInfo.poster + ')' }"
        >
            <van-icon
                class="back-icon"
                name="arrow-left"
                color="rgb(67 68 69)"
                size="22"
                @click="back"
            />
        </div>
        <div class="warp">
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
                    @click="handlImg(index)"
                >
                    <img class="swiper-img" :src="item" />
                </van-swipe-item>
            </van-swipe>
            <div class="zhanwei"></div>
            <van-button class="bootm-btn" square type="warning" color="#ff5f16" @click="hangleCinema(filmInfo.filmId)">选座购票</van-button
            >
        </div>
    </div>
</template>
<script>
import { onMounted, reactive, toRefs, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import http from "/@/utils/https";
import DetailHeader from "./Detail/DetailHeader.vue";
import { ImagePreview } from "vant";
import { useStore, mapState } from "vuex";
export default {
    name: "Detail",
    components: {
        DetailHeader,
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const store = useStore();
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
        const back = () => {
            router.go(-1);
        };
        // 预览图片
        const handlImg = (index) => {
            ImagePreview({
                images: data.filmInfo.photos,
                startPosition: index,
                loop: false,
                closeable: true,
            });
        };
        // 隐藏tab
        store.commit("hideTab");
        // 页面离开 现实tab
        onUnmounted(() => {
            store.commit("showTab");
        });
        const hangleCinema = (e) => {
            router.push(`/cinema/${e}`)
        }
        return {
            ...toRefs(data),
            more,
            handlImg,
            back,
            hangleCinema
        };
    },
};
</script>
<style scoped lang="scss">
.warp {
    padding: 0 10px;
    box-sizing: border-box;
}
.img {
    height: 200px;
    background-size: cover;
    background-position: center;
}
.back-icon {
    width: 30px;
    background: rgb(128 128 128);
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    margin: 5px 0 0 5px;
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
    font-size: 14px;
    color: rgb(173, 173, 173);
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
.zhanwei {
    width: 100%;
    height: 50px;
    margin-top: 10px;
}
.bootm-btn {
    width: 100%;
    line-height: 50px;
    font-size: 16px;
    position: fixed;
    bottom: 0;
    left: 0;
}
</style>
