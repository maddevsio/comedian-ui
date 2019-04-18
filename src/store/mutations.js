export default {
    ADD_ITEMS: (state, { store, payload }) => {
        const entities = { ...state[store].entities }
        payload.forEach(o => {
            entities[o.id] = o
        })
        state[store].entities = entities
    },
    ADD_ITEM: (state, { store, payload }) => {
        state[store].entities[payload.id] = payload
    },
    REMOVE_ITEM: (state, { store, payload }) => {
        delete state[store].entities[payload.id]
    },
    CLEAR_ITEMS: (state, { store }) => {
        state[store] = null
    }
}
