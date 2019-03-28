<template>
  <div class="standupers">
    <Header title="Standupers" :links="this.links" :navLinks="this.navLinks"/>
    <v-content fluid fill-height>
      <Standupers/>
    </v-content>
  </div>
</template>

<script>
// @ is an alias to /src
import Standupers from "@/components/Standupers.vue";
import Header from "@/components/navigation/Header.vue";

export default {
  name: "standupers",
  components: {
    Standupers,
    Header
  },
  computed: {
    links() {
      return this.$store.state.links.linksComedian;
    },
    navLinks() {
      return this.$store.state.links.comedianSideLinks;
    }
  }
};
</script>
