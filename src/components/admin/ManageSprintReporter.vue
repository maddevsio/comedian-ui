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
        <router-link :to="{ name: 'sprintreporterAdd'}">
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
  components: {
    Header
  },
  data() {
    return {
      headers: [
        {
          text: "Team Name",
          value: "team_name",
          class: "text-uppercase font-weight-bold"
        },
        {
          text: "Report Channel",
          value: "report_channel",
          class: "text-uppercase font-weight-bold"
        },
        {
          text: "Report Days",
          value: "report_days",
          class: "text-uppercase font-weight-bold"
        },
        {
          text: "Report Time",
          value: "report_time",
          class: "text-uppercase font-weight-bold"
        },
        {
          text: "Service Enabled",
          value: "service_enabled",
          class: "text-uppercase font-weight-bold"
        },
        {
          text: "Language",
          value: "language",
          class: "text-uppercase font-weight-bold"
        }
      ]
    };
  },
  beforeCreate() {
    const url = `v1/configurations`;
    this.$store.dispatch("GET_SPRINTREPORTER", url);
  }
};
</script>
