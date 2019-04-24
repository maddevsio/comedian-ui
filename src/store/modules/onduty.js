import {
    fetch,
    patch,
    remove,
    post
} from '../../helpers/requests'


const state = {
    entities: {},
}

const actions = {
    GET_ONDUTY: async ({
        commit,
    }, url) => {
        const response = await fetch(url, {}, {}, 'onDuty')
        commit('ADD_ITEMS', { store: 'onduty', payload: response.data })
    },

    ADD_ONDUTY: async ({
        commit,
    },
        data) => {
        const response = await post('v1/settings', data, {}, 'onDuty')
        commit('ADD_ITEM', { store: 'onduty', payload: response.data })
    },

    UPDATE_ONDUTY: async ({
        commit,
    }, {
        url,
        data
    }) => {
        const response = await patch(url, data, {}, 'onDuty')
        commit('ADD_ITEM', { store: 'tasks', payload: response.data })
    },

    REMOVE_ONDUTY: async ({
        commit,
    },
        url
    ) => {
        return await remove(url, {}, 'onDuty')
    }
}

export default {
    state,
    actions
}
