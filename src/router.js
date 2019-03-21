import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/team',
      name: 'team',
      component: () => import('./views/Team.vue')
    },
    {
      path: '/standupers',
      name: 'standupers',   
      component: () => import('./views/Standupers.vue')
    },
    {
      path: '/option',
      name: 'option',   
      component: () => import('./views/Option.vue')
    }
  ]
})
