import Vue from 'vue'
import Router from 'vue-router'
import auth from './middleware/auth';
import anonymous from './middleware/anonymous';
import log from './middleware/log';
import ComponentError from './components/ComponentError'
import { mapState } from "vuex";
import ManageSprintReporter from './components/admin/ManageSprintReporter'
import ManageOnDuty from './components/admin/ManageOnDuty.vue'
import ManageOnDutyAdd from './components/admin/AddOnDuty.vue'
import AddSprintReport from './components/admin/AddSprintReport.vue'



Vue.use(Router)

const HoComponent = (componentPath) => {
  return Vue.component("HoComponent", {
    render(createElement) {
      console.log(this.aa)
      if (this.isAdmin) {
        return createElement(componentPath);
      } else {
        return createElement(ComponentError);
      }
    },
    computed: mapState({
      isAdmin: state => state.user.bot.admin,
      aa: state => state.user
    }),
  });
};


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
      path: '/standups',
      name: 'standups',
      meta: {
        middleware: [auth, log],
      },
      component: () => import('./views/Standups.vue')
    },
    {
      path: '/admin/manage_sprint_reporters/add',
      name: 'sprintreporterAdd',
      meta: {
        middleware: [auth, log],
      },
      component: HoComponent(AddSprintReport)
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
    },
    {
      path: '/onduty/tasks',
      name: 'ondutyTasks',
      meta: {
        middleware: [auth, log],
      },
      component: () => import('./views/Tasks.vue')
    },
    {
      path: '/admin/manage_sprint_reporters',
      name: 'manageSprintReporters',
      meta: {
        middleware: [auth, log],
      },
      component: HoComponent(ManageSprintReporter)
    },
    {
      path: '/onduty/tasks/:id/edit',
      name: 'taskEdit',
      props: true,
      meta: {
        middleware: [auth, log],
      },
      component: () => import('./components/onduty/TasksEdit.vue')
    },
    {
      path: '/onduty/tasks/add',
      name: 'taskAdd',
      props: true,
      meta: {
        middleware: [auth, log],
      },
      component: () => import('./components/onduty/TasksAdd.vue')
    },
    {
      path: '/admin/manage_onduty',
      name: 'manageOnDuty',
      meta: {
        middleware: [auth, log],
      },
      component: HoComponent(ManageOnDuty)
    },
    {
      path: '/admin/manage_onduty/add',
      name: 'onDutyAdd',
      meta: {
        middleware: [auth, log],
      },
      component: HoComponent(ManageOnDutyAdd)
    },
    {
      path: '/on_duty/add',
      name: 'onDutyAddUser',
      meta: {
        middleware: [auth, log],
      },
      component: () => import('./components/onduty/AddOnDuty.vue')
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