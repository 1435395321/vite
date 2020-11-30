<template>
    <div>Detail
        <h1></h1>
    </div>
</template>
<script>
import { onMounted, getCurrentInstance } from "vue";
import {useRoute} from 'vue-router';
export default {
    name: "Detail",
    setup() {
        const route = useRoute();
        const id = route.params.myid;
        return {
            
        }
    },
};
</script>