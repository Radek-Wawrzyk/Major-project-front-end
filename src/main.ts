import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus'

// Main styles
import 'element-plus/dist/index.css';
import '@/styles/index.scss';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus, {
  size: 'large'
});

app.mount('#app');
