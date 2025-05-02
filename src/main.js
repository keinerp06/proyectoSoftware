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
import Dialog from 'primevue/dialog';
import Card from 'primevue/card';
import Select from 'primevue/select';





//usar componentes


const app = createApp(App).use(router);
app.use(VueAxios, axios);
app.component('PanelD', Panel);
app.component('ButtonUno', Button);
app.component('SelectD', Select);
app.component('CardPrime', Card);
app.component('DialogPrime', Dialog);

app.mount('#app')
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
export { app };