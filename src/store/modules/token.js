import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const state = {
  // tokenAuth:localStorage.getState('jwt')
  tokenAuth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib3RfaWQiOjEwLCJleHBpcmUiOjE1NTM4NDU4MDksInRlYW1faWQiOiJUSDEwQkhQREYifQ.vQoFoEAnMrjN7vvItVM60qylAQbNEPvIONNhJDCVKxc'
}

// const getters = {
//   tokenAuth: state => state.tokenAuth
// }

const tokens = {
  state,
  // getters
}
export default tokens