const getters = {
  token: state => state.user.token,
  isAuthenticated: state => !!state.user.token,
}
export default getters
