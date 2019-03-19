<template>
  <div class="home">
  <TeamProjects />
  </div>
</template>

<script>
// @ is an alias to /src
import TeamProjects from '@/components/TeamProjects.vue'

export default {
  name: 'home',
  components: {
    TeamProjects
  }
}
</script>
