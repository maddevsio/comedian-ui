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
    // {
    //   id: 4,
    //   text: 'On Duty',
    //   page: '/onduty'
    // }

  ],
  comedianSideLinks: [
    {
      text: 'Channels',
      page: '/channels'
    },
    {
      text: 'Standupers',
      page: '/standupers'
    },
    {
      text: 'Standups',
      page: '/standups'
    },
    {
      text: 'Users',
      page: '/users'
    },
    {
      text: 'Change password',
      page: '/password_reset'
    },
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
      text: 'Settings On Duty',
      page: '/onduty'
    }

  ],
  adminSideLinks: [
    {
      id: 0,
      text: 'Manage Sprint Reporter',
      page: '/admin/manage_sprint_reporters'
    },
    // {
    //   id: 1,
    //   text: 'Manage On Duty',
    //   page: '/admin/manage_onduty'
    // }
  ]
}
const links = {
  state
}

export default links
