<template>
  <div class="about">
    <Header :title="this.title" :links="this.links" :navLinks="this.navLinks"/>
    <v-content fluid fill-height>
      <Settings/>
    </v-content>
  </div>
</template>

<script>
import Header from "@/components/navigation/Header.vue";
import Settings from "@/components/comedian/Settings.vue";

export default {
  name: "comedian",

  computed: {
    links() {
      return this.$store.state.links.linksHeader;
    },
    navLinks() {
      return this.$store.state.links.comedianSideLinks;
    },
    title() {
      return this.$store.state.user.bot.team_name;
    }
  },
  components: {
    Header,
    Settings
  }
};
</script>
<style>
aside {
  margin-top: 64px !important;
}
</style>
