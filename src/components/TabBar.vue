<template>
    <nav>
        <ul>
            <li>
                <router-link to="/film" active-class="active">
                    <van-icon name="chat-o"/>
                    <div>电影</div>
                </router-link>
            </li>
            <li>
                <router-link to="/cinema" active-class="active">
                    <van-icon name="chat-o" />
                    <div>影院</div></router-link
                >
            </li>
            <li>
                <router-link to="/center" active-class="active">
                    <van-icon name="chat-o" />
                    <div>我的</div></router-link
                >
            </li>
        </ul>
    </nav>
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
    &::after{
       contain: '';
       width: 100%;
       height: 55px; 
    }
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
 .active {
    color: rgb(207, 118, 34);
}
</style>