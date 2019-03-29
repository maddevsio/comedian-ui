<template>
  <div class="standupers">
    <Header title="Settings" :links="this.links" :navLinks="this.navLinks"/>
    <Standupers/>
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
      return this.$store.state.links.linksHeader;
    },
    navLinks() {
      return this.$store.state.links.comedianSideLinks;
    }
  }
};
</script>
