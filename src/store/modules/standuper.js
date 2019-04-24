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
  },
    { url, id }
  ) => {
    await remove(url)
    commit('REMOVE_ITEM', { store: 'standupers', id: id })
  }
}

const standupers = {
  state,
  actions
}

export default standupers