import getters from '../store/getters'
import store from '../store'
export default function anonymous({
  next,
  router,
  to,
}) {
  const token = getters.token(store.state)
  if (!!token) {
    console.log('ffffffffffffffffffffffffffffffffffffffff')
    return next({ name: 'comedian', replace: false })
    // return router.push({
    //   name: `comedian`
    // });
  }
  return next();
}