<template>
    <div>
        <pager></pager>
        <film-header></film-header>
        <router-view></router-view>
    </div>
</template>

<script>
import FilmHeader from "./films/FilmHeader.vue";
import Pager from "../components/Pager.vue";
export default {
    name: "Film",
    components: {
        FilmHeader,
        Pager,
    },
    setup() {},
};
</script>

<style scope lang="scss">
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
}
.swiper {
    width: 100%;
    background: #e09999;
    height: 200px;
}
.goods-card {
    margin: 0;
    background-color: #fff;
}

.delete-button {
    height: 100%;
}
</style>
