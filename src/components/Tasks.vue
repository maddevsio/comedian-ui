<template>
  <v-card class="mt-3 mx-auto" max-width="1200" v-if="tasks">
    <v-data-table
      :headers="headers"
      :items="tasks"
      class="elevation-1 font-weight-medium"
      :rows-per-page-items="this.rows"
    >
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.description }}</td>
        <td class="text-xs-left">{{ props.item.deadline }}</td>
        <td class="text-xs-left">{{ props.item.reminder_interval}}</td>
        <td class="text-xs-left">{{ props.item.done_status }}</td>
        <td class="text-xs-left">{{ props.item.report_to }}</td>
        <td class="text-xs-left">
          <v-icon small class="mr-2" @click="edit(props.item.id)">edit</v-icon>
          <v-icon small @click="delete(props.item.id)">delete</v-icon>
        </td>
      </template>
    </v-data-table>
    <router-link
      :to="{ name: 'taskAdd' , params:  {id: this.$route.params.id,channel_id: this.$route.params.channel_id} }"
    >
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
    tasks: state => {
      const items = getItems(state, "tasks");
      const allUsers = getItems(state, "users");
      items.forEach(item => {
        if (!item.report_to) {
          item.report_to = "N/A";
        } else {
          const user = allUsers.find(
            ({ user_id }) => item.report_to === user_id
          );
          if (!user) {
            item.report_to = "N/A";
          } else {
            item.report_to = user.real_name;
          }
        }
      });
      return items;
    }
  }),
  data() {
    return {
      headers: [
        {
          text: "Description",
          value: "description",
          class: "text-uppercase font-weight-bold"
        },
        {
          text: "Deadline",
          value: "deadline",
          class: "text-uppercase font-weight-bold"
        },
        {
          text: "Reminder Interval",
          value: "reminder_interval",
          class: "text-uppercase font-weight-bold"
        },
        {
          text: "Done Status",
          value: "done_status",
          class: "text-uppercase font-weight-bold"
        },
        {
          text: "Report To",
          value: "report_to",
          class: "text-uppercase font-weight-bold"
        },
        { text: "Options", class: "text-uppercase font-weight-bold" }
      ],
      rows: [
        25,
        50,
        100,
        { text: "$vuetify.dataIterator.rowsPerPageAll", value: -1 }
      ]
    };
  },
  methods: {
    async delete(id) {
      const url = `v1/tasks/${id}`;
      this.$store.dispatch("REMOVE_TASK", url);
    },
    edit(id) {
      this.$router.push({
        name: "taskEdit",
        params: { id: id, channelId: this.$route.params.id }
      });
    }
  },
  beforeCreate() {
    const teamId = store.state.user.bot.team_id;
    const url = `v1/tasks/${teamId}/${this.$route.params.channel_id}`;
    this.$store.dispatch("GET_TASKS", url);
  }
};
</script>
