import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

URL = "https://staging.comedian.maddevs.co"

const state = {
  checkin: []
}

const mutations = {
    CREATE_CHECKIN: (state, checkin) => {
    state.checkin = checkin
  }
}

const actions = {
    CREATE_CHECKIN: ({
    commit
  }) => {
    return new Promise((resolve, reject) => {
      axios.post(`${URL}/login`)
        .then((response) => {
          commit('CREATE_CHECKIN', response.data)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

const login = {
  state,
  mutations,
  actions
}

export default login