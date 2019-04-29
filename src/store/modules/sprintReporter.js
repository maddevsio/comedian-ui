import Vue from 'vue'
import Vuex from 'vuex'
import {
    post,
    fetch,
    patch,
} from '../../helpers/requests'

Vue.use(Vuex)

const state = {
    entities: []
}

const mutations = {
    SET_SPRINTREPORTER: (state, sprintReporters) => {
        state.entities = sprintReporters
    }
}

const actions = {
    GET_SPRINTREPORTER: async ({
        commit,
    }, url) => {
        const response = await fetch(url, {}, {}, 'sprintReporter')
        commit('SET_SPRINTREPORTER', response.data)
    },

    ADD_SPRINTREPORTER: async ({
        commit,
    },
        data) => {
        const response = await post('v1/configurations', data, {}, 'sprintReporter')
        commit('SET_SPRINTREPORTER', response.data)
    },
    UPDATE_SPRINTREPORTER: async ({
        commit,
    }, {
        url,
        data
    }) => {
        const response = await patch(url, data, {}, 'sprintReporter')
        commit('SET_SPRINTREPORTER', response.data)
    },
}

export default {
    state,
    mutations,
    actions
}
