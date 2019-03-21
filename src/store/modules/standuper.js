import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

URL = "https://staging.comedian.maddevs.co"

const state = {
  standupers: []
}

const mutations = {
  SET_STANDUPERS: (state, standupers) => {
    state.standupers = standupers
  }
}

const actions = {
    GET_STANDUPERS: ({ commit }) => {
    return new Promise((resolve, reject) => {
      axios.get(`${URL}/v1/standupers/`)
        .then((response) => {
          commit('SET_STANDUPERS', response.data)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

const standuper = {
  state,
  mutations,
  actions
}

export default standuper
