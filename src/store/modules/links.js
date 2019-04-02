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
    // {
    //   id: 2,
    //   text: 'Reporter',
    //   page: '/reporter'
    // },
    {
      id: 3,
      text: 'Sprint Reporter',
      page: '/sprintreporter'
    },
    // {
    //   id: 4,
    //   text: 'On Duty Service',
    //   page: '/#'
    // }
  ],
  comedianSideLinks: [{
    id: 0,
    text: 'Settings',
    page: '/teams/:id'
  },
  {
    id: 1,
    text: 'Channels',
    page: '/channels'
  },
  {
    id: 2,
    text: 'Standupers',
    page: '/standupers'
  },
  {
    id: 3,
    text: 'StandUp',
    page: '/standups'
  },
  {
    id: 4,
    text: 'Users',
    page: '/users'
  }
  ],
  sprintReporterSideLinks: [{
    id: 0,
    text: 'Settings',
    page: '/sprint-reporter'
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
