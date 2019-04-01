import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  standups: []
}

const mutations = {
  SET_STANDUPS: (state, standups) => {
    state.standups = standups
  },
  REMOVE_STANDUP: (state, id) => {
    const index = state.standups.findIndex(x => x.id == id)
    state.standups.splice(index, 1)
  }
}

const actions = {
  GET_STANDUPS: async ({
    commit,
  }, url) => {
    const response = await fetch(url)
    commit('SET_STANDUPS', response.data)
  },

  REMOVE_STANDUP: async ({
    commit,
  }, {
    url
  }) => {
    return await remove(url)
  },

  POST_STANDUP: async ({ commit }, { url, data }) => {
    const response = await post(url, data)
    commit('SET_STANDUPS', response.data)
  },

  UPDATE_STANDUP: async ({ commit }, { url, data }) => {
    const response = await patch(url, data)
    commit('SET_STANDUPS', response.data)
  }
}

const standups = {
  state,
  mutations,
  actions
}

export default standups
