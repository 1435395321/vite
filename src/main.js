import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
import Store from './store'
import 'vant/lib/index.css'; // 全局引入样式
import { Button, Form, Slider, SwipeCell, Icon, Swipe, SwipeItem, Card, List, Cell,NavBar, IndexBar, IndexAnchor, Search, Empty, Col, Row, DropdownMenu, DropdownItem,Field} from 'vant';


const app = createApp(App)
app.use(Router)
app.use(Store)
app.use(Button).use(Form).use(Slider).use(SwipeCell).use(Icon).use(Swipe).use(SwipeItem).use(Card).use(List).use(Cell)
.use(NavBar).use(IndexAnchor).use(IndexBar).use(Search).use(Empty).use(Col).use(Row).use(DropdownMenu).use(DropdownItem).use(Field)
app.mount('#app')