<template>
  <v-card class="mt-3 mx-auto" max-width="1200" v-if="tasks">
    <v-data-table :headers="headers" :items="onduty" class="elevation-1">
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.channel }}</td>
        <td class="text-xs-left">{{ props.item.description }}</td>
        <td class="text-xs-left">{{ props.item.deadline }}</td>
        <td class="text-xs-left">{{ props.item.reminder_interval}}</td>
        <td class="text-xs-left">{{ props.item.done_status }}</td>
        <td class="text-xs-left">{{ props.item.report_to }}</td>
      </template>
    </v-data-table>
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
        { text: "Channel", value: "channel" },
        { text: "Description", value: "description" },
        { text: "Deadline", value: "deadline" },
        { text: "Reminder Interval", value: "reminder_interval" },
        { text: "Done Status", value: "done_status" },
        { text: "Report To", value: "report_to" }
      ]
    };
  },
  beforeCreate() {
    const teamId = store.state.user.bot.team_id;
    const url = `v1/tasks/team/${teamId}`;
    this.$store.dispatch("GET_TASKS", url);
  }
};
</script>
