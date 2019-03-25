import Vue from 'vue'
import Vuex from 'vuex'
import standuper from './modules/standuper'
import bot from './modules/bot'
import links from './modules/links'
import getters from './getters'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    standuper,
    links,
    bot
  },
  getters
})

export default store