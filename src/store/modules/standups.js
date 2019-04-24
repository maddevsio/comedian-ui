import {
  post,
  fetch,
  patch,
  remove
} from '../../helpers/requests'

const state = {
  entities: {},
}

// REMOVE_STANDUP: (state, id) => {
//   const index = state.standups.findIndex(x => x.id == id)
//   state.standups.splice(index, 1)
// }

const actions = {
  GET_STANDUPS: async ({
    commit,
  }, url) => {
    const response = await fetch(url)
    commit('ADD_ITEMS', { store: 'standups', payload: response.data })
  },

  REMOVE_STANDUP: async ({
    commit,
  },
    { url, id }
  ) => {
    await remove(url)
    commit('REMOVE_ITEM', { store: 'standups', id: id })

  },

  ADD_STANDUP: async ({ commit }, { url, data }) => {
    const response = await post(url, data)
    commit('ADD_ITEM', { store: 'standups', payload: response.data })
  },

  UPDATE_STANDUPS: async ({ commit }, { url, data }) => {
    const response = await patch(url, data)
    commit('ADD_ITEMS', { store: 'standups', payload: response.data })
  }
}

const standups = {
  state,
  actions
}

export default standups
