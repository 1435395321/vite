<template>
    <div>
        <ul class="coming-list">
            <li v-for="item of listData" :key="item.id">
                <a>
                    <div @click="detail(item.filmId)">
                        <img :src="item.poster" />
                    </div>
                    <div @click="detail(item.filmId)">
                        <p class="coming-title">{{ item.name }}</p>
                        <p></p>
                        <p>
                            主演：
                            <span v-for="(list, index) in item.actors" :key="index">{{list.name}}</span>
                        </p>
                        <p>{{ item.nation }} | {{ item.runtime }}分钟</p>
                    </div>
                    <div>购买</div>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { defineComponent, toRefs, reactive, computed, ref } from "vue";
import http from '/@/utils/https'
import { useRouter } from "vue-router";
export default {
    name: "Comingsong",
    setup() {
        const data = reactive({
            listData: []
        });
        http({
            url:'gateway?cityId=310100&pageNum=1&pageSize=10&type=1&k=136082',
            headers:{
                'X-Host': 'mall.film-ticket.film.list'
            }
        }).then(res => {
            data.listData = res.data.data.films;
        })
        // RfilmList().then((res) => {
        //     data.listData = res.data.films;
        // });
        const router = useRouter();
        const detail = (e) => {
            router.push(`/detail/${e}`);
        };
        return {
            ...toRefs(data),
            detail,
        };
    },
};
</script>

<style lang="scss" scope>
.coming-list {
    list-style: none;
    padding: 0;
    margin-left: 15px;
    margin-bottom: 0;
    margin-top: 0;
    li {
        padding: 15px 15px 15px 0;
        height: 94px;
        position: relative;
        font-size: 12px;
        &:last-child {
            margin-bottom: 50px;
        }
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
