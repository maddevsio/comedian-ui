 <template>
  <v-card class="mt-3 mx-auto" max-width="1200" v-if="isShown">
    <v-data-table
      :headers="headers"
      :items="onduty"
      class="elevation-1 font-weight-medium"
      :rows-per-page-items="this.rows"
    >
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.channel_name}}</td>
        <td class="text-xs-left">{{ props.item.notification_time }}</td>
        <td class="text-xs-left">{{ props.item.memberOrders}}</td>
        <td class="text-xs-left">{{ props.item.algorithm }}</td>
        <td class="text-xs-left">{{ props.item.currentOnduty }}</td>
        <td class="text-xs-left">{{ props.item.language }}</td>
        <td class="text-xs-left">
          <router-link
            :to="{ name: 'ondutyTasks', params : {id:props.item.channelId,channel_id:props.item.channel_id}}"
          >{{ props.item.channel_name}} tasks</router-link>
        </td>
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
import { getItems } from "../my-getters";
import store from "../store";

export default {
  computed: mapState({
    onduty: state => {
      const items = getItems(state, "onduty");
      const allUsers = getItems(state, "users");
      const channels = getItems(state, "channels");
      items.forEach(item => {
        const memberOrders = item.members_order.map(member => {
          const user = allUsers.find(({ user_id }) => member === user_id);
          if (!user) {
            return "N/A";
          }
          return user.real_name;
        });
        item.memberOrders = memberOrders.join(", ");
      });

      items.forEach(item => {
        const user = allUsers.find(
          ({ user_id }) => item.current_onduty === user_id
        );
        if (!user) {
          return "N/A";
        }
        item.currentOnduty = user.real_name;
        return item.currentOnduty;
      });

      items.forEach(item => {
        const channel = channels.find(
          ({ channel_id }) => item.channel_id === channel_id
        );
        item.channelId = channel.id;
      });

      items.forEach(item => {
        if (item.language == "ru_RU") {
          item.language = "русский";
        } else {
          item.language = "english";
        }

        switch (item.algorithm) {
          case 0:
            item.algorithm = "working days";
            break;
          case 1:
            item.algorithm = "every day";
            break;
          case 2:
            item.algorithm = "Friday and weekends";
            break;
          default:
            item.algorithm = "";
            break;
        }
      });
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
      channels: [],
      headers: [
        {
          text: "Channel",
          value: "channel_name",
          class: "text-uppercase font-weight-bold"
        },
        {
          text: "Notification Time",
          value: "notification_time",
          class: "text-uppercase font-weight-bold"
        },
        {
          text: "Members Order",
          value: "members_order",
          class: "text-uppercase font-weight-bold"
        },
        {
          text: "Algorithm",
          value: "algorithm",
          class: "text-uppercase font-weight-bold"
        },
        {
          text: "Current Onduty",
          value: "current_onduty",
          class: "text-uppercase font-weight-bold"
        },
        {
          text: "Language",
          value: "language",
          class: "text-uppercase font-weight-bold"
        },
        {
          text: "Tasks",
          class: "text-uppercase font-weight-bold"
        }
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
    const urlUsers = "v1/users";
    this.$store.dispatch("GET_USERS", urlUsers);
    const urlChannels = "v1/channels";
    this.$store.dispatch("GET_CHANNELS", urlChannels);
  }
};
</script>

