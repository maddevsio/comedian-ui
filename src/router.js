import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import auth from './middleware/auth';
import middleware1 from './middleware/middleware1';
import middleware2 from './middleware/middleware2';
import log from './middleware/log';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        middleware: log,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Team.vue')
     },
    {
      path: '/teams/:id',
      name: 'comedian',
      meta: {
        middleware: [middleware2, log],
      },
      component: () => import('./views/Comedian.vue')
    },
    {
      path: '/checkin',
      name: 'checkin',
      meta: {
        middleware: log,
      },
      component: () => import('./views/About.vue'),

    },
    {
      path: '/standupers',
      name: 'standupers',
      meta: {
        middleware: [middleware2, log],
      },
      component: () => import('./views/Standupers.vue')
    },
    {
      path: '/option',
      name: 'option',   
      component: () => import('./views/Option.vue')
    },
    {
      path: '/channels',
      name: 'channels',
      meta: {
        middleware: [middleware2, log],
      },
      component: () => import('./views/Channels.vue')
    },
    {
      path: '/users',
      name: 'users',
      meta: {
        middleware: [middleware2, middleware1, log],
      },
      component: () => import('./views/Users.vue')
    },
    {
      path: '/users/:id',
      name: 'users_edit',
      meta: {
        middleware: [middleware1, log],
      },
      component: () => import('./components/comedian/UsersEdit.vue')
    },
    {
      path: '/channels/:id',
      name: 'edit',
      meta: {
        middleware: [middleware1, log],
      },
      component: () => import('./components/comedian/EditChannels.vue')
    }
  ]
})

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Than run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({
      ...context,
      next: nextMiddleware
    });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware) ?
      to.meta.middleware : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({
      ...context,
      next: nextMiddleware
    });
  }

  return next();
});


export default router;