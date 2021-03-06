import Vue from 'vue'
import Vuex from 'vuex'
import {
  fetch,
  patch
} from '../../helpers/requests'

Vue.use(Vuex)

const state = {
  bot: null,
}

const mutations = {
  SET_BOT: (state, bot) => {
    state.bot = bot
  }
}

const actions = {
  GET_BOT: async ({
    commit,
  }, url) => {
    const response = await fetch(url)
    commit('SET_BOT', response.data)
  },

  UPDATE_BOT: async ({
    commit,
  }, {
    url,
    data
  }) => {
    const response = await patch(url, data)
    commit('SET_BOT', response.data)
  }
}

const bot = {
  state,
  mutations,
  actions
}

export default bot