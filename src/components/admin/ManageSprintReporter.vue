<template>
  <div>
    <Header title="Manage SprintReporters" :links="this.links" :navLinks="this.navLinks"/>
    <v-content fluid fill-height>
      <v-card class="mt-3 mx-auto" max-width="1200">
        <v-data-table :headers="headers" :items="sprintReporters" class="elevation-1">
          <template v-slot:items="props">
            <td class="text-xs-left">{{ props.item.team_name }}</td>
            <td class="text-xs-left">{{ props.item.report_channel }}</td>
            <td class="text-xs-left">{{ props.item.report_days }}</td>
            <td class="text-xs-left">{{ props.item.report_time}}</td>
            <td class="text-xs-left">{{ props.item.service_enabled }}</td>
            <td class="text-xs-left">{{ props.item.language }}</td>
          </template>
        </v-data-table>
        <div class="link">
          <router-link :to="{ name: 'sprintreporterAdd'}">
            <i class="option-btn option-btn--small">Add sprint reporter</i>
            <i class="material-icons option-btn option-btn--add">add</i>
          </router-link>
        </div>
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
    sprintReporters: state => {
      const items = getItems(state, "sprintReporter");
      return items;
    },
    links() {
      return this.$store.state.links.linksHeader;
    },
    navLinks() {
      return this.$store.state.links.adminSideLinks;
    }
  }),
  data() {
    return {
      headers: [
        { text: "Team Name", value: "team_name" },
        { text: "Report Channel", value: "report_channel" },
        { text: "Report Days", value: "report_days" },
        { text: "Report Time", value: "report_time" },
        { text: "Service Enabled", value: "service_enabled" },
        { text: "Language", value: "language" }
      ]
    };
  },
  beforeCreate() {
    const url = `v1/configurations`;
    this.$store.dispatch("GET_SPRINTREPORTER", url);
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
