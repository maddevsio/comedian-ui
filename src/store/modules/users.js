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
    users: [],
}

const mutations = {
    SET_USERS: (state, users) => {
        state.users = users
    }
}

const actions = {
    GET_USERS: async ({
        commit,
    }, url) => {
        const response = await fetch(url)
        commit('SET_USERS', response.data)
    },

    UPDATE_USERS: async ({
        commit,
    }, {
        url,
        data
    }) => {
        const response = await patch(url, data)
        commit('SET_USERS', response.data)
    },

    REMOVE_CHANNEL: async ({
        commit,
    }, {
        url
    }) => {
        const response = await remove(url)
    }
}

const users = {
    state,
    mutations,
    actions
}

export default users