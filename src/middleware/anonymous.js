import getters from '../store/getters'
import store from '../store'
export default function anonymous({
  next,
}) {
  const token = getters.token(store.state)
  if (token) {
    return next({ name: 'comedian', replace: false })
    // return router.push({
    //   name: `comedian`
    // });
  }
  return next();
}