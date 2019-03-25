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
      path: '/login',
      name: 'login',
      component: () => import('./views/Team.vue')
     },
    {
      path: '/teams/:id',
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
      path: '/option',
      name: 'option',   
      component: () => import('./views/Option.vue')
    },
    {
      path: '/channels',
      name: 'channels',
      component: () => import('./views/Channels.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('./views/Users.vue')
    },
    {
      path: '/users/:id',
      name: 'users_edit',
      component: () => import('./components/comedian/UsersEdit.vue')
    },
    {
      path: '/channels/:id',
      name: 'edit',
      component: () => import('./components/comedian/EditChannels.vue')
    }
  ]
})