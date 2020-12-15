<template>
<div>


    <nav>
        <ul>
            <li>
                <router-link to="/film" active-class="active">
                    <van-icon name="play-circle-o"  size="20"/>
                    <div>电影</div>
                </router-link>
            </li>
            <li>
                <router-link to="/cinema" active-class="active">
                    <van-icon name="video-o"  size="20"/>
                    <div>影院</div></router-link
                >
            </li>
            <li>
                <router-link to="/center" active-class="active">
                    <van-icon name="user-o"  size="20"/>
                    <div>我的</div></router-link
                >
            </li>
        </ul>
    </nav>
    <div class="zhanwei"></div>
    </div>
</template>

<script>
export default {};
</script>

<style scope lang="scss">
nav {
    width: 100%;
    height: 55px;
    background: #f8f8f8;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #ccc;
    z-index: 2;
    ul {
        width: 100%;
        height: 55px;
        display: flex;
        align-items: center;
        li {
            flex: 1;
            text-align: center;
        }
    }
   
}
.zhanwei{
       width: 100%;
       height: 55px;
   }
 .active {
    color: rgb(207, 118, 34);
}
</style>