import {
    fetch,
    patch,
    remove
} from '../../helpers/requests'


const state = {
    entities: {},
}

const actions = {
    GET_USERS: async ({
        commit,
    }, url) => {
        const response = await fetch(url)
        commit('ADD_ITEMS', { store: 'users', payload: response.data })
    },

    UPDATE_USERS: async ({
        commit,
    }, {
        url,
        data
    }) => {
        const response = await patch(url, data)
        commit('ADD_ITEM', response.data)
    },

    REMOVE_CHANNEL: async ({
        commit,
    }, {
        url
    }) => {
        // commit('REMOVE_ITEM', item)
        return await remove(url)
    }
}

const users = {
    state,
    actions
}

export default users