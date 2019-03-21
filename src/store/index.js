import Vue from 'vue'
import Vuex from 'vuex'
import standuper from './modules/standuper'
import getters from './getters'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    standuper
  },
  getters
})

export default store

