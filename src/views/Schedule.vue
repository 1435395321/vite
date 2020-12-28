<template>
    <div>
        <div>
            <van-nav-bar :title="name" left-arrow @click-left="onClickLeft" />
        </div>
        <div class="announcement">
            <p>{{ detail.noticeMsg }}</p>
        </div>
        <div v-if="detail.film">{{detail.film.name}}</div>
        <div></div>
    </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import http from "/@/utils/https";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
    setup() {
        const { params } = useRoute();
        const router = useRouter();
        const { commit } = useStore();
        const data = reactive({
            scheduleId: params.id,
            detail: [],
            name: "",
        });

        onMounted(() => {
            commit("hideTab");
            getDetail();
        });
        // 详情请求
        const getDetail = () => {
            http({
                url: `gateway/?scheduleId=${data.scheduleId}&k=5407046`,
                headers: {
                    "X-Host": " mall.film-ticket.schedule.info",
                },
            }).then((res) => {
                data.detail = res.data.data.schedule;
                data.name = data.detail.cinema.name;
                
            });
        };
        // 返回上一级
        const onClickLeft = () => {
            router.go(-1);
        };
        // 详情请求
        return {
            ...toRefs(data),
            onClickLeft,
        };
    },
};
</script>

<style lang="scss" scoped>
.announcement {
    padding: 8px;
    background: #fbf4d8;
    p {
        font-size: 13px;
        color: #e68e1a;
    }
}
</style>