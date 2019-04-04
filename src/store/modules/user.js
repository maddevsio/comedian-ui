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
    console.log(payload)
    const { data: { bot, token } } = await post('login', payload, {}, 'comedian', false)
    console.log(bot)
    commit('LOGIN', { token, bot })
    return bot
  },
  LOGOUT: async ({ commit }) => {
    const response = await post('v1/logout')
    commit('LOGOUT')
  },
  UPDATE_PASSWORD: async ({ commit }, { url, data }) => {
    const response = await post(url, data)
    return response
  }
}

const user = {
  state,
  mutations,
  actions
}

export default user