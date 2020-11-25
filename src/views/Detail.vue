<template>
    <div>Detail
        <h1>{{ $route.params.myid}}</h1>
    </div>
</template>
<script>
import { onMounted, getCurrentInstance } from "vue";
import {useRoute} from 'vue-router';
export default {
    name: "Detail",
    setup() {
    },
};
</script>