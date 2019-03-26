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

URL = "https://staging.comedian.maddevs.co/"

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
  LOGIN: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams();
      params.append('teamname', payload.teamname);
      params.append('password', payload.password);
      axios.post(`${URL}login`, params, config)
        .then((response) => {
          commit('LOGIN', response.data.token)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

const user = {
  state,
  mutations,
  actions
}

export default user