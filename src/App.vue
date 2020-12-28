<template>
    <div class="app">
        <section>
            <router-view class="router-view" v-slot="{ Component }">
                <transition :name="transitionName">
                    <component :is="Component" />
                </transition>
            </router-view>
        </section>
        <tab-bar v-show="isShowTab"></tab-bar>
    </div>
</template>

<script>
import TabBar from "./components/TabBar.vue";
import { computed, onMounted, ref } from "vue";
import { useStore, mapState } from "vuex";
export default {
    name: "App",
    data() {
        return {
            transitionName: "slide-left",
        };
    },
    watch: {
        $route(to, from) {
            // 有主级到次级
            if (to.meta.index > from.meta.index) {
                this.transitionName = "slide-left"; // 向左滑动
            } else if (to.meta.index < from.meta.index) {
                // 由次级到主级
                this.transitionName = "slide-right";
            } else {
                this.transitionName = ""; //同级无过渡效果
            }
        },
    },
    components: {
        TabBar,
    },
    setup() {
        const store = useStore();
        const isShowTab = computed(() => {
            return store.state.isShowTab;
        });
        return {
            isShowTab,
        };
    },
};
</script>
<style lang="scss" scope>
* {
    //  解决三百毫秒
    touch-action: manipulation;
    margin: 0;
    padding: 0;
}
a {
    text-decoration: none;
    color: #333;
}
li {
    list-style: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height:100%;
}
.router-view {
    width: 100%;
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: 0 auto;
    -webkit-overflow-scrolling: touch;
    // overflow-x: hidden;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
    height: 100%;
    will-change: transform;
    transition: all 500ms;
    position: absolute;
    backface-visibility: hidden;
}
.slide-right-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}

.van-badge--fixed {
    z-index: 1000;
}
</style>
