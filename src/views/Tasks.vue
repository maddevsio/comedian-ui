<template>
  <div class="about">
    <Header title="On Duty" :links="this.links"/>
    <v-content fluid fill-height>
      <Tasks/>
    </v-content>
  </div>
</template>

<script>
import Header from "@/components/navigation/HeaderOnDuty.vue";
import Tasks from "@/components/Tasks.vue";

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
    Tasks
  }
};
</script>
<style>
aside {
  margin-top: 64px !important;
}
</style>