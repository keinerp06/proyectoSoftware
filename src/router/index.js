import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/LoginView.vue'
import AdmministrativoView from '@/views/AdmministrativoView.vue'
import VentaView from '@/views/VentaView.vue'
import AgregarView from '@/views/AgregarView.vue'
import InventarioView from '@/views/InventarioView.vue'
import InicialView from '@/views/InicialView.vue'

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
  {
    path: '/Agregar',
    name: 'agregar',
    component: AgregarView
  },
  {
    path: '/Inventario',
    name: 'inventario',
    component: InventarioView
  },
  {
    path: '/Inicial',
    name: 'inicial',
    component: InicialView
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
