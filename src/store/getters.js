const getters = {
  // avatar: state => state.user.avatar,
  token: state => state.user.token,
  isAuthenticated: state => !!state.user.token,
  getItems: (state, mod) => state[mod].entities,
  getItem: (state, mod, id) => state[mod].entities[id]
}
export default getters

/*
const arrayToMap = arr => {
  const result = {}
  arr.forEach(item => {
    result[item.id] = item
  })

  return result
}


const res = await fetch('/list')
const asMap = arrayToMap(res)
commit('ADD_BOTS', asMap)

const res = await fetch('/list/4')
const bots = state.bots.entities
bots[res.id] = res
commit('UPDATE_BOTS', asMap)

const res = await remove('/list/4')
delete state.bots.entities[4]
commit('DELETE_BOTS', 4)
*/
