<template>
  <div>
    <Header title="Users" :links="this.links"/>
    <Users />
  </div>
</template>

<script>
// @ is an alias to /src
import Users from '@/components/comedian/Users.vue'
import Header from '@/components/navigation/Header.vue'
export default {
  name: 'channels',
  computed: {
    links () {
      return this.$store.state.links.linksComedian
    }
  },
  components: {
    Users,
    Header,
  }
}
</script>
