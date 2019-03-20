<template>
<<<<<<< HEAD
  <div class="checkIn">
  <Checkin />
=======
  <div class="about">
    <Header/>
    <SideNav/>
>>>>>>> master
  </div>
</template>

<script>
<<<<<<< HEAD
// @ is an alias to /src
import Checkin from '@/components/Checkin.vue'

export default {
  name: 'checkIn',
  components: {
   Checkin 
  }
}
</script>

=======
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
>>>>>>> master
