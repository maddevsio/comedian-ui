import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/comedian',
      name: 'comedian',
      component: () => import('./views/Comedian.vue')
    },
    {
      path: '/about',
      name: 'checkin',
      component: () => import('./views/About.vue')
    },
    {
      path: '/standupers',
      name: 'standupers',
      component: () => import('./views/Standupers.vue')
    },
    {
      path: '/channels',
      name: 'channels',
      component: () => import('./views/Channels.vue')
    }
  ]
})