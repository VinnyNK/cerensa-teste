import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import PessoasView from "../views/PessoasView";
import PessoaInfoView from "../views/PessoaInfoView";
import NovaPessoaView from "../views/NovaPessoaView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/pessoas',
    name: 'Pessoas',
    component: PessoasView
  },
  {
    path: '/pessoa/nova',
    name: 'NovaPessoa',
    component: NovaPessoaView
  },
  {
    path: '/pessoa/:id',
    name: 'PessoaInfo',
    component: PessoaInfoView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
