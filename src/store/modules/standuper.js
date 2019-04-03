import Vue from 'vue'
import Vuex from 'vuex'
import {
  fetch,
  patch,
  remove
} from '../../helpers/requests'

Vue.use(Vuex)

const state = {
  standupers: []
}

const mutations = {
  SET_STANDUPERS: (state, standupers) => {
    state.standupers = standupers
  }
}

const actions = {
  GET_STANDUPERS: async ({
    commit,
  }, url) => {
    const response = await fetch(url)
    commit('SET_STANDUPERS', response.data)
  },

  UPDATE_STANDUPERS: async ({
    commit,
  }, {
    url,
    data
  }) => {
    const response = await patch(url, data)
    commit('SET_STANDUPERS', response.data)
  },

  REMOVE_STANDUPER: async ({
    commit,
  }, url) => {
    return await remove(url)
  }
}

const standuper = {
  state,
  mutations,
  actions
}

export default standuper