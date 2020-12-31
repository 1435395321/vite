<template>
    <div class="warp">
        <div>
            <van-nav-bar
                v-if="detail.cinema"
                :title="detail.cinema.name"
                left-arrow
                @click-left="onClickLeft"
            />
        </div>

        <div class="announcement">
            <p>{{ detail.noticeMsg }}</p>
        </div>

        <!-- <iframe src="/@/assets/img/zuowei.svg" width="300" height="100"> </iframe> -->
        <div class="film-info">
            <div class="film-name" v-if="detail.film">
                {{ detail.film.name }}
            </div>
            <div class="film-date" v-if="detail.film">
                {{ detail.showAt }} {{ detail.film.language }}
                {{ detail.imagery }}
            </div>
        </div>
        <!-- 座位 -->
        <div class="seating">
            <!-- @touchstart="touchmove" -->
            <ul class="seating-list" :style="scaleFun" @mousewheel="mousewheel">
                <li
                    v-for="(item, index) in seating.seats"
                    :key="index"
                    :style="{
                        top: (item.rowNum - 1) * 25 + 'px',
                        left: (item.columnNum - 1) * 25 + 'px',
                    }"
                    @click="dbHandleScale(item.rowNum, item.columnNum, $event)"
                >
                    <p class="seating-text"></p>
                    <img
                        src="/@/assets/img/zuowei1.svg"
                        v-if="item.isOccupied"
                    />
                    <img
                        src="/@/assets/img/zuowei.svg"
                        v-if="item.isOccupied == false"
                    />
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, reactive, ref, toRefs } from "vue";
import http from "/@/utils/https";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { format } from "date-fns";
export default {
    setup() {
        const { params } = useRoute();
        const router = useRouter();
        const { commit } = useStore();
        const data = reactive({
            scheduleId: params.id,
            detail: [],
            seating: [],
            scale: 1,
            isdblClick: 1,
            height: 0,
        });

        onMounted(() => {
            commit("hideTab");
            getDetail();
            getSeating();
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
                data.detail.showAt = format(
                    new Date(data.detail.showAt * 1000),
                    "周c MM月dd日 HH:mm"
                );
            });
        };
        const getSeating = () => {
            http({
                url: `gateway/?scheduleId=${data.scheduleId}&k=2297582`,
                headers: {
                    "X-Host": "mall.film-ticket.seat.list",
                },
            }).then((res) => {
                data.seating = res.data.data.seatingChart;
                let arr = [];
                data.seating.seats.forEach((item) => {
                    arr.push(item.rowNum);
                });
                data.height = Math.max.apply(null, arr);
                console.log(data.seating);
            });
        };
        // 鼠标移动事件
        const touchmove = (ev) => {
            console.log(ev);
        };
        // 放大功能
        const scaleFun = computed(() => {
            return `transform:scale(${data.scale});height:${
                data.height * 25
            }px`;
        });
        // 双击放大
        let time = null;
        const num = ref(0.25);
        const dbHandleScale = (row, column, event) => {
            if (data.isdblClick == 1) {
                data.isdblClick++;
                time = setTimeout(() => {
                    // 单击事件
                    data.isdblClick = 1;
                    data.scale = 1.5;
                    let li = event.path[1];
                    li.children[0].innerHTML = `${row}排${column}列`;
                }, 300);
            } else if (data.isdblClick == 2) {
                // 双击事件
                clearInterval(time);
                data.isdblClick = 1;
                if (data.scale < 1.75) data.scale += num.value;
                else data.scale = 1;
            }
        };
        const mousewheel = (e) => {
            if (e.deltaY == 100) {
                if (data.scale > 0.75) data.scale -= num.value;
            } else {
                if (data.scale < 1.75) data.scale += num.value;
            }
        };
        // 返回上一级
        const onClickLeft = () => {
            router.go(-1);
        };
        // 详情请求
        return {
            ...toRefs(data),
            onClickLeft,
            touchmove,
            scaleFun,
            dbHandleScale,
            mousewheel,
        };
    },
};
</script>

<style lang="scss" scoped>
.warp {
    background: #f4f4f4;
}
.announcement {
    padding: 8px;
    background: #fbf4d8;
    p {
        font-size: 13px;
        color: #e68e1a;
    }
}
.film-info {
    width: 100%;
    height: 60px;
    background: #fff;
    padding: 0 8px;
    box-sizing: border-box;
    div {
        padding-top: 5px;
    }
    & div:last-child {
        color: #808080;
        font-size: 14px;
    }
}
.seating {
    width: 100%;
    position: relative;
    height: calc(100vh - 45px - 115px);
    overflow: hidden;
    .seating-list {
        position: absolute;
        overflow-y: hidden;
        bottom: 95px;
        top: 70px;
        margin: 0 auto;
        width: 125%;
        left: 5%;
        box-sizing: border-box;
        overflow-x: initial;
        li {
            width: 25px;
            position: absolute;
            img {
                width: 100%;
                background: #fff;
            }
            .seating-text {
                position: absolute;
                top: 0;
                font-size: 12px;
                line-height: 1;
                width: 30px;
                height: 25px;
                z-index: 2;
                color: khaki;
                text-align: center;
            }
        }
    }
}
</style>