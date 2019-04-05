<template>
  <v-card class="mt-3 mx-auto" max-width="500" v-if="false">
    <v-form method="post">
      <v-container>
        <v-flex xs12 md12>
          <v-select
            v-model="reporter.team_name"
            :items="channels"
            label="Channels"
            data-vv-name="select"
            required
          />
        </v-flex>
        <v-flex xs12 md12>
          <v-select
            v-model="reporter.reporting_channel"
            :items="channels"
            label="Channels"
            data-vv-name="select"
            required
          />
        </v-flex>
        <v-flex xs12 md12>
          <v-dialog
            ref="dialog"
            v-model="modal2"
            :return-value.sync="reporter.report_time"
            persistent
            lazy
            full-width
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="reporter.report_time"
                label="Time"
                append-icon="access_time"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker v-if="modal2" v-model="reporter.report_time" full-width>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="$refs.dialog.save(reporter.report_time)">OK</v-btn>
            </v-time-picker>
          </v-dialog>
        </v-flex>
        <v-flex xs12 md12>
          <v-select
            v-model="reporter.language"
            :items="languages"
            label="Language"
            data-vv-name="select"
            required
          />
        </v-flex>
        <v-flex xs12 md12>
          <v-switch
            v-model="reporter.individual_report_status"
            :label="`Individual Report Status ${reporter.individual_report_status ? 'True': 'False' }`"
          />
        </v-flex>
        <v-flex xs12 md12>
          <v-switch
            v-model="reporter.collector_enabled"
            :label="`${reporter.collector_enabled ? 'Collector Enabled ': 'Collector Disabled' }`"
          />
        </v-flex>
        <v-btn block color="primary" @click="Save">Save</v-btn>
      </v-container>
    </v-form>
  </v-card>
  <v-card class="mt-3 mx-auto" max-width="400" v-else>
    <v-alert :value="true" color="warning" icon="priority_high" outline>Service is disabled</v-alert>
  </v-card>
</template>
<script>
import transform from "../helpers/transform";
import { patch } from "../helpers/requests";
import store from "../store";

export default {
  data() {
    return {
      reporter: {
        collector_enabled: true,
        report_channel: null,
        individual_report_status: true,
        language: "en_US",
        report_time: ""
      },
      modal2: false,
      channels: ["general"],
      languages: ["en_EN", "ru_RU"]
    };
  },
  methods: {
    async Save() {
      const team_id = store.state.user.bot.team_id;
      const url = `configurations/${team_id}`;
      this.$store.dispatch("GET_REPORTER");
    }
  },
  beforeCreate() {
    const url = `settings`;
    this.$store.dispatch("GET_ONDUTY", url);
  }
};
</script>

