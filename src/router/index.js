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
import City from '../views/City.vue'
import Search from '../views/Search.vue'
import Consult from '../views/Consult.vue'
const router = createRouter({
    history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
    routes: [{
            path: '/',
            redirect: '/film'
        },
        {
            path: '/center',
            name: 'Center',
            component: Center,
        },
        {
            path: '/detail/:myid', //动态路由
            name: 'Detail',
            component: Detail,
            props: true //验证规则
        },
        // {
        //     path:'/detail',
        //     component:Detail
        // },
        {
            path: '/film',
            component: Film,
            children: [{
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
        },
        
        {
            path: '/cinema',
            name: 'Cinema',
            component: Cinema,
        },
        
        {
            path: '/cinema/search',
            name: 'Search',
            component: Search,
        },
        {
            path:'/city',
            name:'City',
            component:City
        },
        {
            path:'/consult',
            name:'Consult',
            component:Consult
        },
        {
            path: '/:pathMatch(.*)*',
            name: '/film',
            component: Film
        },
    ]
})
router.beforeEach((to, from, next) => {
    let auth = ['/cart', '/order', '/address']; //需要验证的路由
    if (auth.includes(to.fullPath)) {
        console.log('需要验证，返回登录页');
    } else {
        next();
    }
})
export default
router