import Vue from 'vue'
import Router from 'vue-router'
import auth from './middleware/auth';
import log from './middleware/log';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      meta: {
        middleware: log,
      },
      component: () => import('./views/About.vue')
    },
    {
      path: '/teams/:id',
      name: 'comedian',
      meta: {
        middleware: [auth, log]
      },
      component: () => import('./views/Comedian.vue')
    },
    {
      path: '/standupers',
      name: 'standupers',
      meta: {
        middleware: [auth, log],
      },
      component: () => import('./views/Standupers.vue')
    },
    {
      path: '/channels',
      name: 'channels',
      meta: {
        middleware: [auth, log],
      },
      component: () => import('./views/Channels.vue')
    },
    {
      path: '/users',
      name: 'users',
      meta: {
        middleware: [auth, log],
      },
      component: () => import('./views/Users.vue')
    },
    {
      path: '/users/:id',
      name: 'usersEdit',
      meta: {
        middleware: [auth, log],
      },
      component: () => import('./components/comedian/UsersEdit.vue')
    },
    {
      path: '/channels/:id',
      name: 'edit',
      meta: {
        middleware: [auth, log],
      },
      component: () => import('./components/comedian/EditChannels.vue')
    },
    {
      path: '/standupers/:id',
      name: 'standuperEdit',
      meta: {
        middleware: [auth, log],
      },
      component: () => import('./components/comedian/StandupersEdit.vue')
    },
    {
      path: '/sprint-reporter',
      name: 'sprint-reporter',
      meta: {
        middleware: [auth, log],
      },
      component: () => import('./views/SprintReporter.vue')
    },
    {
      path: '/reporter',
      name: 'reporter',
      meta: {
        middleware: [auth, log],
      },
      component: () => import('./views/Reporter.vue')
    },
    {
      path: '/standups',
      name: 'standups',
      meta: {
        middleware: [auth, log],
      },
      component: () => import('./views/Standups.vue')
    },
    {
      path: '/sprintreporter/add',
      name: 'sprintreporterAdd',
      meta: {
        middleware: [auth, log],
      },
      component: () => import('./components/SprintReporterAdd.vue')
    },
    {
      path: '/sprintreporter/list',
      name: 'sprintreporterList',
      meta: {
        middleware: [auth, log],
      },
      component: () => import('./components/sprint-reporter/ListSprintReporter.vue')
    }
  ]
})

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);
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