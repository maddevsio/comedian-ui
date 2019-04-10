<template>
  <v-card class="mt-3 mx-auto" max-width="1200" v-if="tasks">
    <v-data-table :headers="headers" :items="tasks" class="elevation-1">
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.channel }}</td>
        <td class="text-xs-left">{{ props.item.description }}</td>
        <td class="text-xs-left">{{ props.item.deadline }}</td>
        <td class="text-xs-left">{{ props.item.reminder_interval}}</td>
        <td class="text-xs-left">{{ props.item.done_status }}</td>
        <td class="text-xs-left">{{ props.item.report_to }}</td>
        <td class="text-xs-left">
          <router-link
            :to="{ name: 'taskEdit', params: { id: props.item.id }, props: { task: props.item }, component:{TaskEdit} }"
          >
            <i class="material-icons option-btn">edit</i>
          </router-link>
          <i class="material-icons option-btn" @click="deleteTask(props.item.id)">delete</i>
        </td>
      </template>
    </v-data-table>
    <div class="link">
      <router-link :to="{ name: 'taskAdd'}">
        <i class="option-btn option-btn--small">Add Task</i>
        <i class="material-icons option-btn option-btn--add">add</i>
      </router-link>
    </div>
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
        { text: "Report To", value: "report_to" },
        { text: "Options" }
      ]
    };
  },
  methods: {
    async deleteTask(id) {
      const url = `v1/tasks/${id}`;
      this.$store.dispatch("REMOVE_TASK", url);
    }
  },
  beforeCreate() {
    const teamId = store.state.user.bot.team_id;
    const url = `v1/tasks/team/${teamId}`;
    this.$store.dispatch("GET_TASKS", url);
  }
};
</script>
<style lang="scss" scoped>
.option-btn {
  color: grey;
  font-size: 18px;
  text-decoration: none;
  text-transform: none;
  &--small {
    font-size: 14px;
  }

  &:hover {
    color: #42b983;
    cursor: pointer;
  }

  &--add {
    border-radius: 50%;
    padding: 0.5rem;
    margin: 1rem;
    color: white;
    background: #42b983;

    &:hover {
      color: white;
      background: darken(#42b983, 10%);
    }
  }
}
.link {
  display: flex;
  justify-content: flex-end;
}
</style>
