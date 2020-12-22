<template>
    <div>
        <van-list
            van-list
            v-model:loading="state.loading"
            :finished="state.finished"
            finished-text="没有更多了"
            @load="onLoad"
            class="coming-list"
            v-if="state.list"
        >
            <van-cell class="cell" v-for="item in state.list" :key="item">
                <a>
                    <div @click="detail(item.filmId)">
                        <img :src="item.poster" />
                    </div>
                    <div @click="detail(item.filmId)">
                        <p class="coming-title">{{ item.name }}</p>
                        <p></p>
                        <p>
                            主演：
                            <span
                                v-for="(list, index) in item.actors"
                                :key="index"
                                >{{ list.name }}</span
                            >
                        </p>
                        <p>{{ item.nation }} | {{ item.runtime }}分钟</p>
                    </div>
                    <div>购买</div>
                </a>
            </van-cell>
        </van-list>
    </div>
</template>

<script>
import { defineComponent, reactive, computed, ref } from "vue";
import http from "/@/utils/https";
import { useRouter } from "vue-router";
import { useStore  } from "vuex";
export default {
    name: "Comingsong",
    setup() {
        const state = reactive({
            list: [],
            // s是否在加载中
            loading: false,
            // 是否结束
            finished: false,
            current: 0,
        });
        const store = useStore();
        const onLoad = () => {
            state.current ++;
            // 异步更新数据
            // setTimeout 仅做示例，真实场景中一般为 ajax 请求
            http({
                url: `gateway?cityId=${store.state.cityId}&pageNum=${state.current}&pageSize=10&type=1&k=136082`,
                headers: {
                    "X-Host": "mall.film-ticket.film.list",
                },
            }).then((res) => {
                let data = res.data.data
                state.list = [...state.list,...data.films];
                state.loading = false;
                if(state.list.length>=data.total){
                    state.finished = true;
                }
            });
        };
        const router = useRouter();
        const detail = (e) => {
            router.push(`/detail/${e}`);
        };
        return {
            state,
            onLoad,
            detail,
        };
    },
};
</script>

<style lang="scss" scope>
.coming-list {
    list-style: none;
    margin-bottom: 0;
    margin-top: 0;
    .cell {
        padding: 15px;
        position: relative;
        font-size: 12px;
        a {
            display: flex;
            justify-content: space-between;
            align-items: center;
            & div:first-child {
                width: 66px;
                height: 94px;
                background: rgb(249, 249, 249);
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            & div:nth-child(2) {
                width: 60%;
                padding: 0 10px;
                color: rgb(119, 118, 118);
                p {
                    padding-top: 10px;
                    width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .coming-title {
                    font-size: 15px;
                    color: #333;
                }
            }
            & div:last-child {
                line-height: 25px;
                height: 25px;
                width: 50px;
                color: #ff5f16;
                font-size: 13px;
                text-align: center;
                border-radius: 2px;
                position: relative;
                border: 1px solid #ff5f16;
            }
        }
    }
}
</style>
