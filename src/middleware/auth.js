import getters from '../store/getters'
import store from '../store'
export default function auth({
  next,
  router,
  to,
}) {
  console.log('>>>>>>>>>', to.name)
  if (!getters.token(store.state)) {
    return router.push({
      name: `login`
    });
  } else if (to.name === 'login') {
    return router.push({
      name: `comedian`
    });
  }
  return next();
}