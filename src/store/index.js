import Vue from 'vue'
import Vuex from 'vuex'
import standupers from './modules/standuper'
import standups from './modules/standups'
import bots from './modules/bots'
import users from './modules/users'
import channels from './modules/channels'
import links from './modules/links'
import user from './modules/user'
import sprintReporter from './modules/sprintReporter'
import onduty from './modules/onduty'
import tasks from './modules/tasks'
import getters from './getters'
import mutations from './mutations'
import * as LocalStorage from './localStorage'
import channelStandupers from './modules/channelStandupers'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    standupers,
    standups,
    links,
    bots,
    users,
    channels,
    sprintReporter,
    onduty,
    tasks,
    user,
    channelStandupers
  },
  getters,
  mutations,
})

const initialUser = LocalStorage.get('user')

if (initialUser) {
  store.state.user = initialUser
}

store.subscribe((mutation) => {
  switch (mutation.type) {
    case 'LOGIN':
    case 'LOGOUT':
      LocalStorage.save('user', mutation.payload)
      break;
    default:
      break
  }
})

export default store