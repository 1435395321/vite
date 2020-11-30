import {
    createRouter,
    createWebHashHistory
} from 'vue-router';
import Cinema from '../views/Cinema.vue'
import Center from '../views/Center.vue'
import Film from '../views/Film.vue'
import Comingsong from '../views/films/Comingsong.vue'
import Noplaying from '../views/films/Noplaying.vue'
import Detail from '../views/Detail.vue'
const router = createRouter({
    history: createWebHashHistory(),
    routes: [{
        path: '/',
        redirect: '/film'
    },
    {
        path: '/center',
        name: 'Center',
        component: Center,
        meta: {
            index: 1
        }
    },
    {
        path: '/cinema',
        name: 'Cinema',
        component: Cinema,
        meta: {
            index: 1
        }
    },
    {
        path: '/detail/:myid',//动态路由
        name: 'Detail',
        component: Detail,
        props: true
    },
    // {
    //     path:'/detail',
    //     component:Detail
    // },
    {
        path: '/film',
        component: Film,
        children: [
            {
                path: 'comingsong',
                component: Comingsong
            },
            {
                path: 'noplaying',
                component: Noplaying
            },
            {
                path: '',
                redirect: '/film/comingsong'
            },
        ]
    }
    ]
})
router.beforeEach((to, from, next) => {
    let auth = ['/cart','/order','/address','/cinema'];  //需要验证的路由
    if(auth.includes(to.fullPath)) {
        console.log('需要验证，返回登录页');
    } else {
        next();
    }
})
export default
    router