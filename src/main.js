import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

import Router from './router'
import Store from './store'

import { Button, Form, Slider, SwipeCell, Icon, Swipe, SwipeItem, Card, List, Cell,NavBar, IndexBar, IndexAnchor,Search,Empty} from 'vant';
import 'vant/lib/index.css'; // 全局引入样式

const app = createApp(App)
app.use(Router)
app.use(Store)
app.use(Button).use(Form).use(Slider).use(SwipeCell).use(Icon).use(Swipe).use(SwipeItem).use(Card).use(List).use(Cell).use(NavBar).use(IndexAnchor).use(IndexBar).use(Search).use(Empty)
app.mount('#app')