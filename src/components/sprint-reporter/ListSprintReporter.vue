<template>
  <div>
    <v-card class="mt-3 mx-auto" max-width="1200" v-if="configurations">
      <v-data-table :headers="headers" :items="configurations" class="elevation-1">
        <template v-slot:items="props">
          <td class="text-xs-left">{{ props.item.id }}</td>
          <td class="text-xs-left">{{ props.item.service_enabled }}</td>
          <td class="text-xs-left">{{ props.item.team_name }}</td>
          <td class="text-xs-left">{{ props.item.report_time }}</td>
          <td class="text-xs-left">{{ props.item.report_channel }}</td>
          <td class="text-xs-left">{{ props.item.report_days }}</td>
          <td class="text-xs-left">{{ props.item.task_done_status}}</td>
          <td class="text-xs-left">{{ props.item.language}}</td>
          <td class="text-xs-left">
            <!-- <router-link :to="{ name: 'sprintReporterEdit', params: { id: props.item.id } }"> -->
            <i class="material-icons option-btn">edit</i>
            <!-- </router-link> -->
            <i class="material-icons option-btn" @click="deleteSprintReporter(props.item.id)">delete</i>
          </td>
        </template>
      </v-data-table>
      <div class="link">
        <router-link :to="{ path: '/sprintreporter/add'}">
          <i class="option-btn option-btn--small">Add sprint reporter</i>
          <i class="material-icons option-btn option-btn--add">add</i>
        </router-link>
      </div>
    </v-card>
    <v-card class="mt-3 mx-auto" max-width="400" v-else>
      <v-alert
        :value="true"
        color="warning"
        icon="priority_high"
        outline
      >There is no such sprint reporter.</v-alert>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "../../store";
export default {
  computed: mapState({
    configurations: state => {
      return state.configurations.sprintReporters;
    }
  }),
  data() {
    return {
      headers: [
        { text: "ID", value: "id" },
        { text: "Service Enabled", value: "service_enabled" },
        { text: "Team Name", value: "team_name" },
        { text: "Report Time", value: "report_time" },
        { text: "Report Channel", value: "report_channel" },
        { text: "Report Days", value: "report_days" },
        { text: "Task Done Status", value: "task_done_status" },
        { text: "Language", value: "language" },
        { text: "Options" }
      ]
    };
  },
  methods: {
    async deleteSprintReporter(id) {
      const url = `v1/configurations/${id}`;
      this.$store.dispatch("REMOVE_SPRINTREPORTER", url);
    }
  },
  beforeCreate() {
    const url = `v1/configurations`;
    this.$store.dispatch("GET_SPRINTREPORTERS", url);
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