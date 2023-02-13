import { createApp } from 'vue'
import { Toast } from 'vant';
import { Lazyload } from 'vant';
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/css/common.css'
import '@/assets/js/flexible.min'
import 'vant/lib/index.css';
import Axios from 'axios'

const app=createApp(App)
app.config.globalProperties.Axios=Axios
app.use(store).use(router).mount('#app')
app.use(Toast);
app.use(Lazyload);

