<template>
  <div>
    <v-toolbar app fixed clipped-left dark color="primary">
      <v-toolbar-side-icon @click.stop="isNavShown=!isNavShown"></v-toolbar-side-icon>
      <v-toolbar-title>SprintReporter</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <router-link
          class="v-btn v-btn--flat theme--light white--text"
          v-for="routes in links"
          v-bind:key="routes.id"
          :to="`${routes.page}`"
          flat
        >{{routes.text}}</router-link>
      </v-toolbar-items>
    </v-toolbar>
    <v-content fluid fill-height>
      <SprintReporter/>
    </v-content>
  </div>
</template>
<script>
import SprintReporter from "@/components/SprintReporter.vue";
import Header from "@/components/navigation/Header.vue";

export default {
  name: "sprintreporter",
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
    SprintReporter
  }
};
</script>
<style>
aside {
  margin-top: 64px !important;
}
</style>
