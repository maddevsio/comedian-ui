<template>
  <div>
    <v-navigation-drawer clipped-left fixed v-model="isNavShown" app>
      <v-list dense>
        <v-list-tile :to="{ name: 'onduty'}">
          <v-list-tile-content>
            <v-list-tile-title>On Duty</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-group>
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Tasks</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>

          <v-list-tile>
            <v-list-tile-content v-for="subItem in channels" :key="subItem.channel_id">
              <router-link
                :to="{ name: 'ondutyTasks', params : {team_id:subItem.team_id ,channel_id:subItem.channel_id}}"
              >
                <v-list-tile-title>{{ subItem.channel_name }}</v-list-tile-title>
              </router-link>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
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
import { getItems } from "../../my-getters";
export default {
  name: "Header",
  props: ["title", "links"],
  computed: mapState({
    isAdmin: state => {
      return state.user.bot.admin;
    },
    channels: state => {
      const items = getItems(state, "channels");
      // let subItems = null;
      // items.forEach(function(item) {
      //   const link = { title: item.channel_name, id: item.channel_id };
      //   subItems = { ...subItems, link };
      //});
      return items;
    },
    teamId: state => {
      return state.user.bot.team_id;
    }
  }),
  data() {
    return {
      isNavShown: false,
      items: [
        {
          action: "",
          title: "Tasks",
          items: this.channels
        }
      ]
    };
  },
  methods: {
    logout() {
      this.$store
        .dispatch("LOGOUT")
        .then(() => this.$router.push({ path: `/` }));
    }
  },
  beforeCreate() {
    const url = "v1/channels";
    this.$store.dispatch("GET_CHANNELS", url);
  }
};
</script>
<style>
aside {
  margin-top: 64px !important;
}
</style>
