import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// import Comedian from './components/comedian/Comedian.vue'

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
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/Comedian.vue')
    },
    {
      path: '/standupers',
      name: 'standupers',
      component: () => import('./views/Standupers.vue')
    }
    //{
    //   path: '/',
    //   name: 'comedian',
    //   component: Comedian
    // }
  ]
})