<template>
  <div>
    <Header title="Channels" :links="this.links" :navLinks="this.navLinks"/>
    <v-content fluid fill-height>
      <Channels/>
    </v-content>
  </div>
</template>

<script>
import Channels from "@/components/comedian/Channels.vue";
import Header from "@/components/navigation/Header.vue";

export default {
  name: "channels",
  computed: {
    links() {
      return this.$store.state.links.linksHeader;
    },
    navLinks() {
      return this.$store.state.links.comedianSideLinks;
    }
  },
  components: {
    Channels,
    Header
  }
};
</script>
