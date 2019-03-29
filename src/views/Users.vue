<template>
  <div>
    <Header title="Users" :links="this.links" :navLinks="this.navLinks"/>
    <v-content fluid fill-height>
      <Users/>
    </v-content>
  </div>
</template>

<script>
// @ is an alias to /src
import Users from "@/components/comedian/Users.vue";
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
    Users,
    Header
  }
};
</script>
