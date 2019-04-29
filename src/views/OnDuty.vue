<template>
  <div class="about">
    <Header title="On Duty" :links="this.links" :navLinks="this.navLinks"/>
    <v-content fluid fill-height>
      <OnDuty/>
    </v-content>
  </div>
</template>

<script>
import Header from "@/components/navigation/Header.vue";
import OnDuty from "@/components/OnDuty.vue";

export default {
  computed: {
    links() {
      return this.$store.state.links.linksHeader;
    },
    navLinks() {
      return this.$store.state.links.onDutySideLinks;
    }
  },
  components: {
    Header,
    OnDuty
  }
};
</script>
<style>
aside {
  margin-top: 64px !important;
}
</style>