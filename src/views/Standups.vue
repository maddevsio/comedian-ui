<template>
  <div>
    <Header title="Standups" :links="this.links" :navLinks="this.navLinks"/>
    <v-content fluid fill-height>
      <Standups/>
    </v-content>
  </div>
</template>

<script>
import Standups from "@/components/Standups.vue";
import Header from "@/components/navigation/Header.vue";

export default {
  name: "standupers",
  components: {
    Standups,
    Header
  },
  computed: {
    links() {
      return this.$store.state.links.linksHeader;
    },
    navLinks() {
      return this.$store.state.links.comedianSideLinks;
    }
  }
};
</script>
