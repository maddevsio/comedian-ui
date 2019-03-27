const getters = {
  // avatar: state => state.user.avatar,
  token: state => state.user.token,
  isAuthenticated: state => !!state.user.token
}
export default getters
