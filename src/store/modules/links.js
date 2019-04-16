import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  linksHeader: [
    {
      id: 0,
      text: 'Comedian',
      page: '/comedian'
    },
    // {
    //   id: 1,
    //   text: 'Collector',
    //   page: '/#'
    // },

    {
      id: 3,
      text: 'Sprint Reporter',
      page: '/sprintreporter'
    },
    {
      id: 4,
      text: 'On Duty',
      page: '/onduty'
    }

  ],
  comedianSideLinks: [{
    id: 0,
    text: 'Settings',
    page: '/comedian'
  },
  {
    id: 1,
    text: 'Password Change',
    page: '/password_reset'
  },
  {
    id: 2,
    text: 'Channels',
    page: '/channels'
  },
  {
    id: 3,
    text: 'Standupers',
    page: '/standupers'
  },
  {
    id: 4,
    text: 'StandUp',
    page: '/standups'
  },
  {
    id: 5,
    text: 'Users',
    page: '/users'
  }
  ],
  sprintReporterSideLinks: [
    {
      id: 0,
      text: 'Settings',
      page: '/sprintreporter'
    },
    // {
    //   id: 1,
    //   text: 'Add Sprint Reporter',
    //   page: '/sprintreporter/add'
    // },
    // {
    //   id: 2,
    //   text: 'List Sprint Reporters',
    //   page: '/sprintreporter/list'
    // }
  ],
  onDutySideLinks: [
    {
      id: 0,
      text: 'Settings',
      page: '/onduty'
    },
    {
      id: 1,
      text: 'Tasks',
      page: '/onduty/tasks'
    }
  ],
  reporterSideLinks: [
    {
      id: 0,
      text: 'Settings',
      page: '/reporter'
    }
  ],
  adminSideLinks: [
    {
      id: 0,
      text: 'Manage Sprint Reporter',
      page: '/admin/manage_sprint_reporters'
    },
    {
      id: 1,
      text: 'Manage On Duty',
      page: '/admin/manage_onduty'
    }
  ]
}
const links = {
  state
}

export default links
