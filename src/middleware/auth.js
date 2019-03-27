import getters from '../store/getters'
import store from '../store'
export default function auth({
  next,
  router
}) {
  if (!getters.isAuthenticated(store.state)) {
    return router.push({
      name: `login`
    });
  }

  return next();
}