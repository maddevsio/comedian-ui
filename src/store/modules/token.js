import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const state = {
  // tokenAuth:localStorage.getState('jwt')
  tokenAuth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib3RfaWQiOjEwLCJleHBpcmUiOjE1NTM4NTI0MDgsInRlYW1faWQiOiJUSDEwQkhQREYifQ.WYWwLDfXflPy3WN3GulAIyYd18f1CmbB4nCRBuMrzxQ'
}

// const getters = {
//   tokenAuth: state => state.tokenAuth
// }

const tokens = {
  state,
  // getters
}
export default tokens