import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

const state = {
  linksComedian: [{
    id: 0,
    text: 'Comedian',
    page: '/#'
  },
  {
    id: 1,
    text: 'Collector',
    page: '/#'
  },
  {
    id: 2,
    text: 'Reporter',
    page: '/#'
  },
  {
    id: 3,
    text: 'Sprint Reporter',
    page: '/sprint-reporter'
  },
  {
    id: 4,
    text: 'On Duty Service',
    page: '/#'
  }
  ],
  comedianSideLinks: [{
    id: 0,
    text: 'Settings',
    page: '/teams/:id'
  },
  {
    id: 1,
    text: 'Channels',
    page: '/channels'
  },
  {
    id: 2,
    text: 'Standupers',
    page: '/standupers'
  },
  {
    id: 3,
    text: 'StandUp',
    page: '/#'
  },
  {
    id: 4,
    text: 'Users',
    page: '/users'
  }
  ]
}
const links = {
  state
}

export default links