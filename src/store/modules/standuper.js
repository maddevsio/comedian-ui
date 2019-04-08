import {
  fetch,
  patch,
  remove
} from '../../helpers/requests'

const state = {
  entities: {},
}

const actions = {
  GET_STANDUPERS: async ({
    commit,
  }, url) => {
    const response = await fetch(url)
    commit('ADD_ITEMS', { store: 'standupers', payload: response.data })
  },

  UPDATE_STANDUPERS: async ({ commit }, { url, data }) => {
    const response = await patch(url, data)
    commit('ADD_ITEMS', { store: 'standupers', payload: response.data })
  },

  REMOVE_STANDUPER: async ({
    commit,
  }, url) => {
    return await remove(url)
  }
}

const standupers = {
  state,
  actions
}

export default standupers