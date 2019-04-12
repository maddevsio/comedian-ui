<template lang="html">
<div>
  <Header title="Settings" :links="this.links" :navLinks="this.navLinks"/>
  <v-content fluid fill-height>
    <v-card class="mt-3 mx-auto" max-width="400">
    <v-alert :value="true" color="warning" icon="priority_high" outline>Content is not allowed</v-alert>
  </v-card>
  </v-content>
</div>  
</template>
<script>
import Header from "@/components/navigation/Header.vue";
export default {
  name: "users",
  computed: {
    links() {
      return this.$store.state.links.linksHeader;
    },
    navLinks() {
      return this.$store.state.links.comedianSideLinks;
    }
  },
  components: {
    Header
  }
};
</script>
