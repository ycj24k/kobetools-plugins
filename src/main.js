import './public-path';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css';
import '@/api/interceptor';

const app = createApp(App);
const store = createPinia();
app.use(router);
app.use(store);
app.use(ArcoVue);
app.use(ArcoVueIcon);
app.mount('#plugins');
