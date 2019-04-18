import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const state = []

const mutations = {
    ADD_MESSAGE: ({ text, type }) => {
        state.push({ text, type: type || 'error' })
    },
    POP_MESSAGE: () => {
        if (state.length > 0) {
            state.shift()
        }
    }
}

const actions = {
    ADD_ERROR: ({ commit }, payload) => {
        commit('ADD_MESSAGE', payload)
    },
    REMOVE_ERROR: ({ commit }) => {
        commit('POP_MESSAGE')
    }
}

export default {
    state,
    actions,
    mutations,
}
