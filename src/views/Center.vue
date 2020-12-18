<template>
    <div class="warp">
        <div class="top-login">
            <div>
                <img src="/@/assets/img/profile.jpg" class="top-img" />
                <span>立即登录</span>
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
            <div class="menu-list van-hairline--bottom">
                <div class="menu-left">
                    <van-icon name="send-gift-o" color="#ff8462" />
                    <div>卖座券</div>
                </div>
                <div>
                    <van-icon name="arrow" color="#e7e8ea" />
                </div>
            </div>
            <div class="menu-list van-hairline--bottom">
                <div class="menu-left">
                    <van-icon name="cash-on-deliver" color="#baa27a" />
                    <div>红包组合</div>
                </div>
                <div>
                    <van-icon name="arrow" color="#e7e8ea" />
                </div>
            </div>
            <div class="menu-list van-hairline--bottom">
                <div class="menu-left">
                    <van-icon name="balance-o" color="#ffc057" />
                    <div>余额</div>
                </div>
                <div>
                    <van-icon name="arrow" color="#e7e8ea" />
                </div>
            </div>
            <div class="menu-list van-hairline--bottom">
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
export default {
    name: "Center",
};
</script>

<style lang="scss" scoped>
.warp {
    position: absolute;
    width: 100%;
    top: 0%;
    height: 100%;
    background: #f4f4f4;
    .top-login {
        width: 100%;
        height: 180px;
        background-image: url("/@/assets/img/bg.6837f67.png");
        background-size: 100% 100%;
        display: flex;
        align-items: center;

        div {
            // height: 63px;
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
        background: #fff;
        height: 70px;
        text-align: center;
        font-size: 13px;
        display: flex;
        align-items: center;
        color: #797d82;
        margin-bottom: 10px;
    }
    .menu {
        background: #fff;
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
}
</style>
