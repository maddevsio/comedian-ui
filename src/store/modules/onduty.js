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
    SET_ONDUTY: (state, configurations) => {
        state.entities = configurations
    }
}

const actions = {
    GET_ONDUTY: async ({
        commit
    }, url) => {
        const response = await fetch(url, {}, {}, 'onDuty')
        commit('SET_ONDUTY', response.data)
    },

    ADD_ONDUTY: async ({
        commit,
    },
        data) => {
        const response = await post('configurations', data, {}, 'onDuty')
        commit('SET_ONDUTY', response.data)
    },

    UPDATE_ONDUTY: async ({
        commit,
    }, {
        url,
        data
    }) => {
        const response = await patch(url, data, {}, 'onDuty')
        commit('SET_ONDUTY', response.data)
    },

    REMOVE_ONDUTY: async ({
        commit,
    },
        url
    ) => {
        return await remove(url, {}, {}, 'onDuty')
    }
}

export default {
    state,
    mutations,
    actions
}
