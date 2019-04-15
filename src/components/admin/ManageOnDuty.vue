<template>
  <div>
    <Header title="Manage OnDuty" :links="this.links" :navLinks="this.navLinks"/>
    <v-content fluid fill-height>
      <v-card class="mt-3 mx-auto" max-width="1200">
        <v-data-table :headers="headers" :items="onduty" class="elevation-1">
          <template v-slot:items="props">
            <td class="text-xs-left">{{ props.item.team_name }}</td>
            <td class="text-xs-left">{{ props.item.channel }}</td>
            <td class="text-xs-left">{{ props.item.notification_time }}</td>
            <td class="text-xs-left">{{ props.item.members_order}}</td>
            <td class="text-xs-left">{{ props.item.algorithm }}</td>
            <td class="text-xs-left">{{ props.item.current_onduty }}</td>
            <td class="text-xs-left">{{ props.item.language }}</td>
          </template>
        </v-data-table>
        <router-link :to="{ name: 'onDutyAddUser'}">
          <v-fab-transition>
            <v-btn v-show="!hidden" color="primary" dark fab fixed bottom right>
              <v-icon>add</v-icon>
            </v-btn>
          </v-fab-transition>
        </router-link>
      </v-card>
    </v-content>
  </div>
</template>		

<script>
import Header from "@/components/navigation/Header.vue";
import { mapState } from "vuex";
import { getItems } from "../../my-getters";
export default {
  computed: mapState({
    onduty: state => {
      const items = getItems(state, "onduty");
      return items;
    },
    links() {
      return this.$store.state.links.linksHeader;
    },
    navLinks() {
      return this.$store.state.links.adminSideLinks;
    }
  }),
  components: {
    Header
  },
  data() {
    return {
      headers: [
        { text: "Team Name", value: "team_name" },
        { text: "Channel", value: "channel" },
        { text: "Notification Times", value: "notification_time" },
        { text: "Members Order", value: "members_order" },
        { text: "Algorithm", value: "algorithm" },
        { text: "Current Onduty", value: "current_onduty" },
        { text: "Language", value: "language" }
      ]
    };
  },
  beforeCreate() {
    const url = `v1/settings`;
    this.$store.dispatch("GET_ONDUTY", url);
  }
};
</script>
