import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import 'primeflex/primeflex.css';
import "vue3-toastify/dist/index.css";

import Vue3Toastify from 'vue3-toastify';

import "./main.css"
const app = createApp(App)

app.use(createPinia())
app.use(Vue3Toastify, {
    autoClose: 1000,
  });
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.mount('#app')
