import Vue from 'vue'
import Vuex from 'vuex'
import {
  post,
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
  // LOGIN: async ({ commit }, payload) => {
  //   const { data: { bot, token } } = await post('login', payload, {}, 'comedian', false)
  //   commit('LOGIN', { token, bot })
  //   return bot
  // },
  LOGIN: async ({ commit }, payload) => {
    const { data } = await post('login', payload, {}, 'comedian', false)
    commit('LOGIN', {data})
    return data
  },
  LOGOUT: async ({ commit }) => {
    await post('v1/logout')
    commit('LOGOUT')
  },
}

const user = {
  state,
  mutations,
  actions
}

export default user