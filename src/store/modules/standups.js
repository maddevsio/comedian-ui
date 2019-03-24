import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

URL = "https://staging.comedian.maddevs.co"

const state = {
  standups: []
}

const mutations = {
  SET_STANDUPS: (state, standups) => {
    state.standups = standups
  },
  REMOVE_STANDUP: (state, id) =>{
    index = state.standups.findIndex(x => x.id == id)
    state.standups.splice(index, 1)
  }
}

const actions = {
    GET_STANDUPS: ({ commit }) => {
    return new Promise((resolve, reject) => {
      axios.get(`${URL}/v1/standups`)
        .then((response) => {
          commit('SET_STANDUPS', response.data)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  REMOVE_STANDUP: ({ commit, id}) => {  
    return new Promise((resolve, reject) => {
      axios.get(`${URL}/v1/standups/${id}`)
        .then((response) => {
          commit('REMOVE_STANDUP', id)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  POST_STANDUP: ({ commit}) => {
        console.log(commit)    
    return new Promise((resolve, reject) => {
      axios.get(`${URL}/v1/standups/${commit}`)
        .then((response) => {
          commit('POST_STANDUP', commit)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}

const standups = {
  state,
  mutations,
  actions
}

export default standups
