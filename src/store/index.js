import Vue from 'vue'
import Vuex from 'vuex'
import standuper from './modules/standuper'
import standups from './modules/standups'
import bots from './modules/bots'
import users from './modules/users'
import channels from './modules/channels'
import links from './modules/links'
import tokens from './modules/token'
import user from './modules/user'
import getters from './getters'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    standuper,
    standups,
    links,
    bots,
    users,
    channels,
    tokens,
    user
  },
  getters
})

export default store