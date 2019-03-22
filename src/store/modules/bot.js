import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

URL = "https://staging.comedian.maddevs.co"

const state = {
  bot: []
}

const mutations = {
  SET_BOT: (state, bot) => {
    state.bot = bot
  }
}

const actions = {
  GET_BOT: ({
    commit
  }) => {
    return new Promise((resolve, reject) => {
      axios.get(`${URL}/v1/bots/2`)
        .then((response) => {
          commit('SET_BOT', response.data)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

const bot = {
  state,
  mutations,
  actions
}

export default bot