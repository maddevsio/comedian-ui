<template>
  <div>
    <Header title="Settings" :links="this.links" :navLinks="this.navLinks"/>
    <v-content fluid fill-height>
      <SprintReporterList/>
    </v-content>
  </div>
</template>
<script>
import SprintReporterList from "@/components/sprint-reporter/ListSprintReporter.vue";
import Header from "@/components/navigation/Header.vue";

export default {
  name: "sprint-reporter",
  computed: {
    links() {
      return this.$store.state.links.linksHeader;
    },
    navLinks() {
      return this.$store.state.links.sprintReporterSideLinks;
    }
  },
  components: {
    Header,
    SprintReporterList
  }
};
</script>
<style>
aside {
  margin-top: 64px !important;
}
</style>
