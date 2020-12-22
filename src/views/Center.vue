<template>
    <div>
        <div class="top-login">
            <div @click="login">
                <img src="/@/assets/img/profile.jpg" class="top-img" />
                <span>{{ token ? "155****5187" : "请登录" }}</span>
            </div>
        </div>
        <!-- 选项 -->
        <van-row class="nav-list">
            <van-col span="12">
                <van-icon name="coupon-o" size="30px" color="#ffc82f" />
                <div>电影订单</div>
            </van-col>
            <van-col span="12">
                <van-icon name="orders-o" size="30px" color="#c6da5c" />
                <div>商品订单</div>
            </van-col>
        </van-row>
        <!-- 菜单 -->
        <div class="menu">
            <div class="menu-list van-hairline--bottom" @click="hangleSkip('ticket')">
                <div class="menu-left">
                    <van-icon name="send-gift-o" color="#ff8462" />
                    <div>卖座券</div>
                </div>
                <div>
                    <van-icon name="arrow" color="#e7e8ea" />
                </div>
            </div>
            <div class="menu-list van-hairline--bottom" @click="hangleSkip('packet')">
                <div class="menu-left">
                    <van-icon name="cash-on-deliver" color="#baa27a" />
                    <div>红包组合</div>
                </div>
                <div>
                    <van-icon name="arrow" color="#e7e8ea" />
                </div>
            </div>
            <div class="menu-list van-hairline--bottom" @click="hangleSkip('balance')">
                <div class="menu-left">
                    <van-icon name="balance-o" color="#ffc057" />
                    <div>余额</div>
                </div>
                <div>
                    <van-icon name="arrow" color="#e7e8ea" />
                </div>
            </div>
            <div class="menu-list van-hairline--bottom" @click="hangleSkip('setting')">
                <div class="menu-left">
                    <van-icon name="setting-o" color="#bcce58" />
                    <div>设置</div>
                </div>
                <div>
                    <van-icon name="arrow" color="#e7e8ea" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
    name: "Center",
    setup() {
        const router = useRouter(),
            { state, commit } = useStore(),
            data = reactive({
                token: state.token,
            });
        // 跳转
        const hangleSkip = (e) => {
            commit("isToken", { path: "/LayoutCenter/"+e, router: router });
        };
        // 登录
        const login = () => {
            if(state.token == '')
                router.push("/login");
        };
        return {
            ...toRefs(data),
            login,
            hangleSkip,
        };
    },
};
</script>

<style lang="scss" scoped>
.top-login {
    width: 100%;
    height: 180px;
    background-image: url("/@/assets/img/bg.6837f67.png");
    background-size: 100% 100%;
    display: flex;
    align-items: center;

    div {
        display: flex;
        align-items: center;
        margin-left: 25px;
        .top-img {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            margin-right: 15px;
        }
        span {
            color: #fff;
        }
    }
}
.nav-list {
    width: 100%;
    height: 70px;
    text-align: center;
    font-size: 13px;
    display: flex;
    align-items: center;
    color: #797d82;
    margin-bottom: 10px;
}
.menu {
    .menu-list {
        height: 50px;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .menu-left {
            height: 100%;
            display: flex;
            align-items: center;
            i {
                font-size: 22px;
                margin-right: 10px;
            }
        }
    }
}
</style>
