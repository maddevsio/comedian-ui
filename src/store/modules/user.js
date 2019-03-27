import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueAxios, axios)
const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

const state = {
  token: null,
  bot: null,
}

const mutations = {
  LOGIN: (state, payload) => {
    console.log('LOGIN>>', payload)
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
    const url = 'https://staging.comedian.maddevs.co/login'
    const data = new URLSearchParams()
    Object.entries(payload).forEach(([key, value]) => {
      data.append(key, value)
    })
    const { data: { bot, token } } = await axios.post(url, data, config)
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