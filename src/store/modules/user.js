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


const TOKEN = 'token'

const state = {
  token: localStorage.getItem(TOKEN)
}

const mutations = {
  LOGIN: (state, newToken) => {
    localStorage.setItem(TOKEN, newToken)
    state.token = newToken
  },
  LOGOUT: (state) => {
    localStorage.removeItem(TOKEN)
    state.token = null
  }
}

const actions = {
  LOGIN: async ({ commit }, payload) => {
    const url = 'https://staging.comedian.maddevs.co/login'
    const data = new URLSearchParams()
    Object.entries(payload).forEach(([ key, value ]) => {
      // console.log(key, value)
      data.append(key, value)
    })
    const { data: { token } } = await axios.post(url, data, config)
    commit('LOGIN', token)
  }
}

const user = {
  state,
  mutations,
  actions
}

export default user