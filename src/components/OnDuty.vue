 <template>
  <v-card class="mt-3 mx-auto" max-width="1200" v-if="isShown">
    <v-data-table
      :headers="headers"
      :items="onduty"
      class="elevation-1 text-uppercase font-weight-medium"
      :rows-per-page-items="this.rows"
    >
      <template v-slot:items="props">
        <td class="text-xs-left text-lowercase">{{ props.item.channel }}</td>
        <td class="text-xs-left text-lowercase">{{ props.item.notification_time }}</td>
        <td class="text-xs-left text-lowercase">{{ props.item.members_order}}</td>
        <td class="text-xs-left text-lowercase">{{ props.item.algorithm }}</td>
        <td class="text-xs-left text-lowercase">{{ props.item.current_onduty }}</td>
        <td class="text-xs-left text-lowercase">{{ props.item.language }}</td>
      </template>
    </v-data-table>
    <router-link :to="{ name: 'onDutyAddUser'}">
      <v-fab-transition>
        <v-btn color="primary" dark fab fixed bottom right>
          <v-icon>add</v-icon>
        </v-btn>
      </v-fab-transition>
    </router-link>
  </v-card>

  <v-card class="mt-3 mx-auto" max-width="400" v-else>
    <v-alert :value="true" color="warning" icon="priority_high" outline>Service is disabled</v-alert>
  </v-card>
</template>		
<script>
import { mapState } from "vuex";
import transform from "../helpers/transform";
import { getItems } from "../my-getters";
import store from "../store";

export default {
  computed: mapState({
    onduty: state => {
      const items = getItems(state, "onduty");
      return items;
    },
    isShown: state => {
      return (
        state.onduty.entities.length != 0 || typeof state.onduty != undefined
      );
    }
  }),
  data() {
    return {
      headers: [
        { text: "Channel", value: "channel" },
        { text: "Notification Time", value: "notification_time" },
        { text: "Members Order", value: "members_order" },
        { text: "Algorithm", value: "algorithm" },
        { text: "Current Onduty", value: "current_onduty" },
        { text: "Language", value: "language" }
      ],
      rows: [
        25,
        50,
        100,
        { text: "$vuetify.dataIterator.rowsPerPageAll", value: -1 }
      ]
    };
  },

  beforeCreate() {
    const teamId = store.state.user.bot.team_id;
    const url = `v1/settings/team/${teamId}`;
    this.$store.dispatch("GET_ONDUTY", url);
  }
};
</script>

