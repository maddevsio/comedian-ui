import {
  fetch,
  patch,
  remove,
} from '../../helpers/requests'

const state = {
  entities: {},
}

const actions = {
  GET_CHANNELS: async ({
    commit,
  }, url) => {
    const response = await fetch(url)
    commit('ADD_ITEMS', { store: 'channels', payload: response.data })
  },

  UPDATE_CHANNEL: async ({ commit }, { url, data }) => {
    const response = await patch(url, data)
    commit('ADD_ITEM', { store: 'channels', payload: response.data })
  },

  REMOVE_CHANNEL: async ({
    commit,
  },
    { url, id }
  ) => {
    await remove(url)
    commit('REMOVE_ITEM', { store: 'channels', id: id })
  }
}

const channels = {
  state,
  actions
}

export default channels