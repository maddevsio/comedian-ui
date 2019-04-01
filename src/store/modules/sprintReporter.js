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
    configurations: []
}

const mutations = {
    SET_SPRINTREPORTERS: (state, sprintReporters) => {
        state.sprintReporters = sprintReporters
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
    }, {
        url,
        data
    }) => {
        const response = await post(url, data, {}, 'sprintReporter')
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

const configurations = {
    state,
    mutations,
    actions
}
export default configurations
