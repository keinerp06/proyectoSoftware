import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from 'vue-axios';
import axios from 'axios';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';


//importar componentes

import 'primeicons/primeicons.css'

import Button from 'primevue/button';
import Panel from 'primevue/panel';



//usar componentes


const app = createApp(App).use(router);
app.use(VueAxios, axios);
app.component('PanelD', Panel);
app.component('ButtonUno', Button);

app.mount('#app')
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
export { app };