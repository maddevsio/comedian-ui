<template>
  <div class="about">
    <Header/>
    <SideNav/>
    <h1>Settings</h1>
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

