import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

import Router from './router'
import Store from './store'

import { Button, Form,Slider, Toast,Notify,SwipeCell,Icon, Swipe, SwipeItem,Lazyload } from 'vant';
import 'vant/lib/index.css'; // 全局引入样式

const app = createApp(App)
app.use(Router)
app.use(Store)
app.use(Button).use(Form).use(Slider).use(Toast).use(Notify).use(SwipeCell).use(Icon).use(Swipe).use(SwipeItem).use(Lazyload)
app.mount('#app')
app.use(Lazyload, {
  lazyComponent: true,
});