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
      id: 2,
      text: 'Reporter',
      page: '/reporter'
    },
    {
      id: 3,
      text: 'Sprint Reporter',
      page: '/sprintreporter'
    },
    // {
    //   id: 4,
    //   text: 'On Duty Service',
    //   page: '/#'
    // },
    {
      id: 5,
      text: 'Logout',
      page: '/login'
    }
  ],
  comedianSideLinks: [{
    id: 0,
    text: 'Settings',
    page: '/comedian'
  },
  {
    id: 1,
    text: 'Peassword Reset',
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
  sprintReporterSideLinks: [{
    id: 0,
    text: 'Settings',
    page: '/sprintreporter'
  },
  {
    id: 1,
    text: 'Add Sprint Reporter',
    page: '/sprintreporter/add'
  },
  {
    id: 2,
    text: 'List Sprint Reporters',
    page: '/sprintreporter/list'
  }
  ]

}
const links = {
  state
}

export default links
