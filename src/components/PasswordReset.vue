<template lang="html">
<div>
  <Header title="Settings" :links="this.links" :navLinks="this.navLinks"/>
  <v-content fluid fill-height>
    <PasswordReset/>
  </v-content>
</div>  
</template>
<script>
import PasswordReset from "@/components/comedian/PasswordReset.vue";
import Header from "@/components/navigation/Header.vue";
export default {
  name: "users",
  computed: {
    links() {
      return this.$store.state.links.linksHeader;
    },
    navLinks() {
      return this.$store.state.links.comedianSideLinks;
    }
  },
  components: {
    PasswordReset,
    Header
  }
};
</script>
