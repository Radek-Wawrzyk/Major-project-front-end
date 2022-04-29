import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { QuillEditor } from '@vueup/vue-quill'

import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus'

// Main styles
import 'element-plus/dist/index.css';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@/styles/index.scss';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus, {
  size: 'large'
});

app.component('quill-editor', QuillEditor);
app.mount('#app');
