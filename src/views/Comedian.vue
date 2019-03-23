<template>
  <div class="about">
    <Header title="Settings" :links="this.links"/>
    <SideNav/>
    <div class ="content">
      <Settings/>  
    </div>
  </div>
</template>

<script>
import Header from '@/components/navigation/Header.vue'
import SideNav from '@/components/navigation/SideNav.vue'
import Settings from '@/components/comedian/Settings.vue'

export default {
  name: 'comedian',
  data() {
    return {
      links: [
        {
          id: 0,
          text: 'Comedian',
          page:'/#'
        },
        {
          id: 1,
          text: 'Collector',
          page:'/#'
        },
        {
          id: 2,
          text: 'Reporter',
          page:'/#'
        },
        {
          id: 3,
          text: 'Sprint Reporter',
          page:'/#'
        },
        {
          id: 4,
          text: 'On Duty Service',
          page:'/#'
        },
        {
          id: 5,
          text: 'Other Service',
          page:'/#'
        }        
      ]
    }
  },
  components: {
    SideNav,
    Header,
    Settings
  }
}
</script>
<style lang="scss" scoped>
.content {
  margin-left:120px;
}
</style>

