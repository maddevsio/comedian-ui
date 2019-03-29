<template>
  <div>
    <Header title="Settings" :links="this.links" :navLinks="this.navLinks"/>
    <v-content fluid fill-height>
      <SprintReporter/>
    </v-content>
  </div>
</template>
<script>
import SprintReporter from "@/components/SprintReporter.vue";
import Header from "@/components/navigation/Header.vue";

export default {
  name: "sprint-reporter",
  computed: {
    links() {
      return this.$store.state.links.linksHeader;
    },
    navLinks() {
      return this.$store.state.links.comedianSideLinks;
    }
  },
  components: {
    Header,
    SprintReporter
  }
};
</script>
<style>
aside {
  margin-top: 64px !important;
}
</style>
