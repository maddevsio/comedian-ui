<template>
  <div class="about">
    <h1>This is an about page</h1>
    <SideNav/>
  </div>
</template>

<script>
import SideNav from '@/components/navigation/SideNav.vue'

export default {
  name: 'home',
  components: {
    SideNav
  }
}
</script>
