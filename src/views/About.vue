<template>
  <div class="about">
    <Header/>
    <SideNav/>
  </div>
</template>

<script>
import Header from '@/components/navigation/Header.vue'
import SideNav from '@/components/navigation/SideNav.vue'

export default {
  name: 'home',
  components: {
    SideNav,
    Header
  }
}
</script>
