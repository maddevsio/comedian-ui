<template>
  <div>
    <Header title="Add Sprint Report" :links="this.links" :navLinks="this.navLinks"/>
    <v-content fluid fill-height>
      <AddSprintReport/>
    </v-content>
  </div>
</template>
<script>
import AddSprintReport from "@/components/sprint-reporter/AddSprintReport.vue";
import Header from "@/components/navigation/Header.vue";

export default {
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
    AddSprintReport
  }
};
</script>
<style>
aside {
  margin-top: 64px !important;
}
</style>
