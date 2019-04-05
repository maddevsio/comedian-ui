 <template>
  <v-card class="mt-3 mx-auto" max-width="1200" v-if="false">
    <v-data-table :headers="headers" :items="entities" class="elevation-1">
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
  </v-card>
  <v-card class="mt-3 mx-auto" max-width="400" v-else>
    <v-alert :value="true" color="warning" icon="priority_high" outline>Service is disabled</v-alert>
  </v-card>
</template>		
<script>
import transform from "../helpers/transform";
import store from "../store";
import getItems from "../store/getters";
import { mapState } from "vuex";

export default {
  // computed: {
  //   entities: state => getItems(state, "onduty")
  // },
  computed: mapState({
    entities: state => state.entities
  }),
  data() {
    return {
      headers: [
        { text: "Team Name", value: "team_name" },
        { text: "Channel", value: "channel" },
        { text: "Notification Time", value: "notification_time" },
        { text: "Members Order", value: "members_order" },
        { text: "Algorithm", value: "algorithm" },
        { text: "Current Onduty", value: "current_onduty" },
        { text: "Language", value: "language" }
      ]
    };
  },

  beforeCreate() {
    const url = `settings`;
    this.$store.dispatch("GET_ONDUTY", url);
  }
};
</script>

