<template>
    <header>
        <div v-top>{{title}}</div>
    </header>
</template>

<script>
import { top } from "/@/direcation";
export default {
    directives: {
        top
    },
    props:['title'],
    setup() {

    }
};
</script>

<style scoped lang="scss">
    div{
        width: 100%;
        background: #fff;
        position: fixed;
        top: 0;
        text-align: center;
        line-height: 30px;
        transition: .5s;
    }
</style>