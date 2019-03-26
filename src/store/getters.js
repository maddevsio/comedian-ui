const getters = {
  // avatar: state => state.user.avatar,
  token: state => state.user.token,
  checkLogin: state => state.user.token === null
}
export default getters
