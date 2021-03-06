<template>
  <div>
    <v-navigation-drawer clipped-left fixed v-model="isNavShown" app>
      <v-list dense>
        <v-list-tile :to="{ name: 'onduty'}">
          <v-list-tile-content>
            <v-list-tile-title>
              <strong>On Duty settings</strong>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-group>
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title class="primary--text">
                  <strong>Tasks by channels</strong>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>

          <v-list-tile v-for="subItem in channels" :key="subItem.channel_id">
            <v-list-tile-content>
              <router-link
                style="text-decoration:none"
                :to="{ name: 'ondutyTasks', params : {id:subItem.id ,channel_id:subItem.channel_id}}"
              >
                <v-list-tile-title>{{ subItem.channel_name }}</v-list-tile-title>
              </router-link>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="channels.lenght<1"></v-list-tile>
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
import store from "../../store";

export default {
  name: "Header",
  props: ["title", "links"],
  computed: mapState({
    isAdmin: state => {
      return state.user.bot.admin;
    },
    channels: state => {
      const onduty = getItems(state, "onduty");
      const channels = getItems(state, "channels");
      let channelList = [];
      onduty.forEach(item => {
        const channel = channels.find(
          ({ channel_id }) => item.channel_id === channel_id
        );
        if (!channel) {
          return "no channel";
        } else {
          channelList.push({
            id: channel.id,
            channel_id: channel.channel_id,
            channel_name: channel.channel_name
          });
        }
      });
      return channelList;
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
    const teamId = store.state.user.bot.team_id;
    const urlSetting = `v1/settings/team/${teamId}`;
    this.$store.dispatch("GET_ONDUTY", urlSetting);
  }
};
</script>
<style>
aside {
  margin-top: 64px !important;
}
</style>
