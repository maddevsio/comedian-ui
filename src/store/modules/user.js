import Vue from 'vue'
import Vuex from 'vuex'
import {
  post,
  fetch,
  patch
} from '../../helpers/requests'

Vue.use(Vuex)

const state = {
  token: null,
  bot: null,
}

const mutations = {
  LOGIN: (state, payload) => {
    state.token = payload.token
    state.bot = payload.bot
  },
  LOGOUT: (state) => {
    state.token = null
    state.bot = null
  }
}

const actions = {
  LOGIN: async ({ commit }, payload) => {
    const { data: { bot, token } } = await post('login', payload, {}, 'comedian', false)
    commit('LOGIN', { token, bot })
    return bot
  }
}

const user = {
  state,
  mutations,
  actions
}

export default user