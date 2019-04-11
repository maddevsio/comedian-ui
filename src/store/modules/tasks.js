import {
    fetch,
    patch,
    post,
    remove
} from '../../helpers/requests'


const state = {
    entities: {},
}

const actions = {
    GET_TASKS: async ({
        commit,
    }, url) => {
        const response = await fetch(url, {}, {}, 'onDuty')
        commit('ADD_ITEMS', { store: 'tasks', payload: response.data })
    },

    GET_TASK: async ({
        commit,
    }, url) => {
        const response = await fetch(url, {}, {}, 'onDuty')
        commit('ADD_ITEM', { store: 'tasks', payload: response.data })
    },

    ADD_TASK: async ({
        commit,
    },
        data) => {
        const response = await post('v1/tasks', data, {}, 'onDuty')
        commit('ADD_ITEMS', { store: 'tasks', payload: response.data })
    },

    UPDATE_TASK: async ({
        commit,
    }, {
        url,
        data
    }) => {
        const response = await patch(url, data, {}, 'onDuty')
        commit('ADD_ITEM', { store: 'tasks', payload: response.data })
    },

    REMOVE_TASK: async ({
        commit,
    },
        url
    ) => {
        return await remove(url, {}, 'onDuty')
    }
}

const tasks = {
    state,
    actions
}

export default tasks