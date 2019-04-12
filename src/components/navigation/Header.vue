<template>
  <div>
    <v-navigation-drawer clipped-left fixed v-model="isNavShown" app>
      <v-list dense>
        <v-list-tile v-for="(item) in navLinks" :key="item.title" :to="item.page">
          <v-list-tile-content>
            <v-list-tile-title>{{ item.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left dark color="primary">
      <v-toolbar-side-icon @click.stop="isNavShown=!isNavShown"></v-toolbar-side-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <router-link
          v-if="isAdmin"
          class="v-btn v-btn--flat theme--light white--text"
          :to="{ name: 'manageSprintReporters'}"
          flat
        >Admin</router-link>
        <router-link
          class="v-btn v-btn--flat theme--light white--text"
          v-for="routes in links"
          v-bind:key="routes.id"
          :to="`${routes.page}`"
          flat
        >{{routes.text}}</router-link>
        <span class="v-btn v-btn--flat theme--light white--text" @click="logout()">LOG OUT</span>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Header",
  props: ["title", "links", "navLinks"],
  computed: mapState({
    isAdmin: state => {
      return state.user.bot.admin;
    }
  }),
  data() {
    return {
      isNavShown: false
    };
  },
  methods: {
    logout() {
      this.$store
        .dispatch("LOGOUT")
        .then(() => this.$router.push({ path: `/` }));
    }
  }
};
</script>
<style>
aside {
  margin-top: 64px !important;
}
</style>
