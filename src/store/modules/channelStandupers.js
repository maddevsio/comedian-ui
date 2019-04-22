
import {
    fetch,
} from '../../helpers/requests'

const state = {
    entities: {},
}

const actions = {
    GET_CHANNEL_STANDUPERS: async ({
        commit,
    }, url) => {
        const response = await fetch(url)
        commit('ADD_ITEMS', { store: 'channelStandupers', payload: response.data })
    }
}
const channelStandupers = {
    state,
    actions
}

export default channelStandupers