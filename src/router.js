import Vue from 'vue'
import Router from 'vue-router'
import auth from './middleware/auth';
import anonymous from './middleware/anonymous';
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
        middleware: [anonymous, log],
      },
      component: () => import('./views/About.vue')
    },
    {
      path: '/comedian',
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
      path: '/sprintreporter',
      name: 'sprintreporter',
      meta: {
        middleware: [auth, log],
      },
      component: () => import('./views/SprintReporterSettings.vue')
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
      component: () => import('./views/SprintReporter.vue')
    },
    {
      path: '/standup/:id/edit',
      name: 'standupEdit',
      meta: {
        middleware: [auth, log],
      },
      component: () => import('./components/comedian/StandupEdit.vue')
    },
    {
      path: '/password_reset',
      name: 'passwordReset',
      meta: {
        middleware: [auth, log],
      },
      component: () => import('./components/PasswordReset.vue')
    },
    {
      path: '/onduty',
      name: 'onduty',
      meta: {
        middleware: [auth, log],
      },
      component: () => import('./views/OnDuty.vue')
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