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
    reporters: []
}

const mutations = {
    SET_REPORTERS: (state, REPORTERS) => {
        state.reporters = REPORTERS
    }
}

const actions = {
    GET_REPORTERS: async ({
        commit,
    }, url) => {
        const response = await fetch(url, {}, {}, 'reporter')
        commit('SET_REPORTERS', response.data)
    },

    ADD_REPORTER: async ({
        commit,
    },
        data) => {
        const response = await post('v1/configurations', data, {}, 'reporter')
        commit('SET_REPORTERS', response.data)
    },
    UPDATE_REPORTERS: async ({
        commit,
    }, {
        url,
        data
    }) => {
        const response = await patch(url, data, {}, 'reporter')
        commit('SET_REPORTERS', response.data)
    },

    REMOVE_REPORTERS: async ({
        commit,
    }, {
        url
    }) => {
        return await remove(url, {}, {}, 'reporter')
    }
}

export default {
    state,
    mutations,
    actions
}
