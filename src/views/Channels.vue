<template>
  <div>
    <Header title="Channels" :links="this.links"/>
    <SideNav/>
    <Channels />
  </div>
</template>

<script>
import Channels from '@/components/comedian/Channels.vue'
import Header from '@/components/navigation/Header.vue'
import SideNav from '@/components/navigation/SideNav.vue'
  
export default {
  name: 'channels',
  computed: {
    links () {
      return this.$store.state.links.linksComedian
    }
  },
  components: {
    Channels,
    Header,
    SideNav
  },
  
}
</script>
