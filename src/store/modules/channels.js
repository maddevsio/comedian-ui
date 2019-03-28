import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import {
  fetch,
  patch,
  remove
} from '../../helpers/requests'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

const state = {
  channels: [],
}

const mutations = {
  SET_CHANNELS: (state, channels) => {
    state.channels = channels
  }
}

const actions = {
  GET_CHANNELS: async ({
    commit,
  }, url) => {
    const response = await fetch(url)
    commit('SET_CHANNELS', response.data)
  },

  UPDATE_CHANNEL: async ({
    commit,
  }, {
    url,
    data
  }) => {
    const response = await patch(url, data)
    commit('SET_CHANNELS', response.data)
  },

  REMOVE_CHANNEL: async ({
    commit,
  }, {
    url
  }) => {
    const response = await remove(url)
  }
}

const channels = {
  state,
  mutations,
  actions
}

export default channels