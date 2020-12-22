<template>
    <van-sticky class="home-header">
        <ul>
            <li>
                <router-link to="/film/comingsong" active-class="active-li"
                    >正在热映</router-link
                >
            </li>
            <li>
                <router-link to="/film/noplaying" active-class="active-li"
                    >即将上映</router-link
                >
            </li>
        </ul>
    </van-sticky>
</template>

<script>
import { ref } from "vue";
export default {
    name: "FilmHeader",
    setup() {
    },
};
</script>

<style scoped lang="scss">
ul {
    width: 100%;
    margin: 0 auto;
    display: flex;
    background: #fff;
    li {
        flex: 1;
        text-align: center;

        a {
            width: 40%;
            display: block;
            line-height: 40px;
            margin: auto;
        }
    }
}

.active-li {
    position: static;
    top: 0;
    color: #ff5f16;
    border-bottom: 2px solid #ff5f16;
}
</style>
