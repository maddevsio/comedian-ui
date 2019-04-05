<template>
  <div>
    <Header title="Reporter" :links="this.links" :navLinks="this.navLinks"/>
    <v-content fluid fill-height>
      <Reporter/>
    </v-content>
  </div>
</template>
<script>
import Reporter from "@/components/Reporter.vue";
import Header from "@/components/navigation/Header.vue";

export default {
  name: "reporter",
  computed: {
    links() {
      return this.$store.state.links.linksHeader;
    },
    navLinks() {
      return this.$store.state.links.reporterSideLinks;
    }
  },
  components: {
    Header,
    Reporter
  }
};
</script>
<style>
aside {
  margin-top: 64px !important;
}
</style>
