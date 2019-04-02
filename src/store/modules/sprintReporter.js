import Vue from 'vue'
import Vuex from 'vuex'
import {
    post,
    fetch,
    patch,
    remove
} from '../../helpers/requests'

Vue.use(Vuex)

const state = {
    entities: []
}

const mutations = {
    SET_SPRINTREPORTERS: (state, sprintReporters) => {
        state.entities = sprintReporters
    }
}

const actions = {
    GET_SPRINTREPORTERS: async ({
        commit,
    }, url) => {
        const response = await fetch(url, {}, {}, 'sprintReporter')
        commit('SET_SPRINTREPORTERS', response.data)
    },

    ADD_SPRINTREPORTER: async ({
        commit,
    },
        data) => {
        const response = await post('v1/configurations', data, {}, 'sprintReporter')
        commit('SET_SPRINTREPORTERS', response.data)
    },
    UPDATE_SPRINTREPORTERS: async ({
        commit,
    }, {
        url,
        data
    }) => {
        const response = await patch(url, data, {}, 'sprintReporter')
        commit('SET_SPRINTREPORTERS', response.data)
    },

    REMOVE_SPRINTREPORTERS: async ({
        commit,
    }, {
        url
    }) => {
        return await remove(url, {}, {}, 'sprintReporter')
    }
}

export default {
    state,
    mutations,
    actions
}
