import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from 'vue-axios';
import axios from 'axios';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';


//importar componentes

import 'primeicons/primeicons.css'

const app = createApp(App).use(router);
app.use(VueAxios, axios);

app.mount('#app')
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
export { app };