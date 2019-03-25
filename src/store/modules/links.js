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
      page: '/#'
    },
    {
      id: 4,
      text: 'On Duty Service',
      page: '/#'
    },
    {
      id: 5,
      text: 'Other Service',
      page: '/#'
    }
  ]
}
const links = {
  state
}

export default links