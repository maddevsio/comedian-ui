<template>
  <div class="about">
    <Header title="Settings" :links="this.links" :navLinks="this.navLinks"/>
    <v-content fluid fill-height>
      <Settings/> 
    </v-content>
  </div>
</template>

<script>
import Header from '@/components/navigation/Header.vue'
import Settings from '@/components/comedian/Settings.vue'

export default {
  name: 'comedian',
  data() {
    return {
      navLinks: [
        {
          id: 0,
          text: 'Settings',
          page:'/#'
        },
        {
          id: 1,
          text: 'Channels',
          page:'/channels'
        },
        {
          id: 2,
          text: 'Standupers',
          page:'/standupers'
        },
        {
          id: 3,
          text: 'StandUp',
          page:'/#'
        },
        {
          id: 4,
          text: 'Users',
          page:'/users'
        }           
      ]
    }
  },
  computed: {
    links () {
      return this.$store.state.links.linksComedian
    }
  },
  components: {
    Header,
    Settings
  }
}
</script>
<style>
 aside {
   margin-top: 64px!important;
 } 
</style>
