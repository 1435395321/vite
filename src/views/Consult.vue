<template>
    <div>
        <div v-html="cousultList"></div>
    </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import http from "/@/utils/https";
export default {
    name: "Consult",
    setup() {
        const state = reactive({
            cousultList: "",
        });
        http({
            url: "gateway?actId=ElzMZU125260",
            headers: {
                "X-Host": "mall.act.static-page.info",
            },
        }).then((res) => {
            state.cousultList = res.data.data.data.content;
        });
        return {
            ...toRefs(state),
        };
    },
};
</script>

<style>
</style>