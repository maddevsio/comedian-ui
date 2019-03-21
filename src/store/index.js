import Vue from 'vue'
import Vuex from 'vuex'
import standuper from './modules/standuper'
import standups from './modules/standups'
import getters from './getters'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    standuper,
    standups
  },
  getters
})

export default store

