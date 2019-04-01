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
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="isNavShown=!isNavShown"></v-toolbar-side-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-toolbar-items class="hidden-sm-and-down">
        <router-link
          class="v-btn v-btn--flat theme--light"
          v-for="routes in links"
          v-bind:key="routes.id"
          :to="`${routes.page}`"
          flat
        >{{routes.text}}</router-link>
      </v-toolbar-items>-->
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: ["title", "links", "navLinks"],
  data() {
    return {
      isNavShown: false
    };
  }
};
</script>
<style>
aside {
  margin-top: 64px !important;
}
</style>
