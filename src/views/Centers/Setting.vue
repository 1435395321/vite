<template>
  <div>
      <my-nav-bar :title="title"></my-nav-bar>
      <van-button type="primary" @click="backLogin">退出登录</van-button>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue';
import Navbar from '/@/components/NavBar.vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'
export default {
    name:'Setting',
    components:{
        'my-nav-bar':Navbar
    },
    setup() {
        const title = ref('设置');
        const store = useStore();
        const router = useRouter();
        const backLogin = () => {
            store.commit('backLogin');
            router.back(-1);
        }
        return{
            title,
            backLogin
        }
    }
}
</script>

