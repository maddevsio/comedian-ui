<template>
  <div>
    <Header title="Settings" :links="this.links" :navLinks="this.navLinks"/>
    <Channels />
  </div>
</template>

<script>
import Channels from '@/components/comedian/Channels.vue'
import Header from '@/components/navigation/Header.vue'
  
export default {
  name: 'channels',
  computed: {
    links () {
      return this.$store.state.links.linksComedian
    },
    navLinks () {
      return this.$store.state.links.comedianSideLinks
    }
  },
  components: {
    Channels,
    Header,
  },
  
}
</script>
