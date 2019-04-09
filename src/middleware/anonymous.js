import getters from '../store/getters'
import store from '../store'
export default function anonymous({
  next,
  router,
  to,
}) {
  const token = getters.token(store.state)
  if (!!token) {
    return router.push({
      name: `comedian`
    });
  }
  return next();
}