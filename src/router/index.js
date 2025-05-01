import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/LoginView.vue'
import AdmministrativoView from '@/views/AdmministrativoView.vue'
import VentaView from '@/views/VentaView.vue'

const routes = [

  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/Admin',
    name: 'Admin',
    component: AdmministrativoView
  },
  {
    path: '/Venta',
    name: 'venta',
    component: VentaView
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
