import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    entities: {},
},

const actions = {
    ADD_ERROR: ({ commit }, data) => {
        commit('ADD_ITEM', { store: 'errors', payload: data })
    }
}

export default {
    state,
    actions
}
