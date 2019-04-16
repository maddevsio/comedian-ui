<template>
  <v-card class="mt-3 mx-auto" max-width="1200" v-if="tasks">
    <v-data-table
      :headers="headers"
      :items="tasks"
      class="elevation-1 text-uppercase font-weight-medium"
      :rows-per-page-items="this.rows"
    >
      <template v-slot:items="props">
        <td class="text-xs-left text-lowercase">{{ props.item.description }}</td>
        <td class="text-xs-left text-lowercase">{{ props.item.deadline }}</td>
        <td class="text-xs-left text-lowercase">{{ props.item.reminder_interval}}</td>
        <td class="text-xs-left text-lowercase">{{ props.item.done_status }}</td>
        <td class="text-xs-left text-lowercase">{{ props.item.report_to }}</td>
        <td class="text-xs-left text-lowercase">
          <v-icon small class="mr-2" @click="edit(props.item.id)">edit</v-icon>
          <v-icon small @click="delete(props.item.id)">delete</v-icon>
        </td>
      </template>
    </v-data-table>
    <router-link :to="{ name: 'taskAdd'}">
      <v-fab-transition>
        <v-btn v-show="!hidden" color="primary" dark fab fixed bottom right>
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
      return items;
    }
  }),
  data() {
    return {
      headers: [
        { text: "Description", value: "description" },
        { text: "Deadline", value: "deadline" },
        { text: "Reminder Interval", value: "reminder_interval" },
        { text: "Done Status", value: "done_status" },
        { text: "Report To", value: "report_to" },
        { text: "Options" }
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
      this.$router.push({ name: "taskEdit", params: { id: id } });
    }
  },
  beforeCreate() {
    const teamId = store.state.user.bot.team_id;
    const url = `v1/tasks/${teamId}/${this.$route.params.channel_id}`;
    this.$store.dispatch("GET_TASKS", url);
  }
};
</script>
