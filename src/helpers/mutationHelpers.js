
export const addItems = (state, payload) => {
    const res = {}
    payload.forEach(o => {
        res[o.id] = o;
    })
    state.entities = res
}

export const addItem = (state, payload) => {
    state.entities[payload.id] = payload
}

export const removeItem = (state, payload) => {
    delete state.entities[payload.id]
}