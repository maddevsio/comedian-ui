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
    REMOVE_ITEM: (state, { store, id }) => {
        delete state[store].entities[id]
        state[store].entities = { ...state[store].entities }
    }
}
