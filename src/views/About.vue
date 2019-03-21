<template>
 <div class="about">
    <Checkin /> 
    <Header/>
    <SideNav/>
  </div>
</template>

<script>
// @ is an alias to /src
import Checkin from '@/components/Checkin.vue'
import Header from '@/components/navigation/Header.vue'
import SideNav from '@/components/navigation/SideNav.vue'

export default {
  name: 'about',
  components: {
   Checkin,
   SideNav,
   Header
  }
}
</script>