export const getItems = (state, mod) => {
  const entities = state[mod].entities
  return Object.values(entities);
}

export const getItem = (state, mod, id) => state[mod].entities[id]

export const getItemByField = (state, mod, fieldName, id) => {
  const entities = state[mod].entities
  return entities.filter(e => e[fieldName] === id)[0]
}
