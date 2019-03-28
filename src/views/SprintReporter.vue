<template>
  <div class="standupers">
    <Header title="Settings" :links="this.links" :navLinks="this.navLinks"/>
    <v-content fluid fill-height>
      <SprintReporter/>
    </v-content>
  </div>
</template>
<script>
import SprintReporter from "@/components/SprintReporter.vue";

export default {
  components: {
    SprintReporter
  }
};
</script>

