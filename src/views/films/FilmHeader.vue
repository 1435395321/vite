<template>
    <div class="home-header">
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
    </div>
</template>

<script>
export default {
    name: "FilmHeader",
};
</script>

<style scope lang="scss">
.home-header {
    width: 100%;
    position: sticky;
    top: 0px;
    background: #fff !important;
    z-index: 99;
    ul {
        width: 100%;
        margin: 0 auto;
        display: flex;

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
}
.active-li {
    position: static;
    top: 0;
    color: #ff5f16;
    border-bottom: 2px solid #ff5f16;
}
</style>
