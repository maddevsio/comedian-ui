<template>
  <v-card class="mt-3 mx-auto" max-width="500" v-if="reporter">
    <v-form method="post">
      <v-container>
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
      <v-card>
        <v-layout>
          <v-alert v-model="alert" dismissible type="success">Successfully saved</v-alert>
        </v-layout>
        <v-layout>
          <v-alert v-model="errorStatus" dismissible type="error">{{errorText}}</v-alert>
        </v-layout>
      </v-card>
    </v-form>
    {{reporter}}
  </v-card>
  <v-card class="mt-3 mx-auto" max-width="400" v-else>
    <v-alert :value="true" color="warning" icon="priority_high" outline>Service is disabled</v-alert>
  </v-card>
</template>
<script>
import transform from "../helpers/transform";
import store from "../store";
import { mapState } from "vuex";
export default {
  computed: mapState({
    reporter: state => state.reporter.reporters[0]
  }),
  data() {
    return {
      modal2: false,
      channels: ["general", "channel1", "channel2", "CGPFD161K"],
      languages: ["ru_RU", "en_EN"],
      alert: false,
      errorStatus: false,
      errorText: ""
    };
  },
  methods: {
    async Save() {
      const report_id = this.reporter.id;
      const url = `reports/${report_id}`;
      this.$store
        .dispatch("UPDATE_REPORTERS", { url, data: this.reporter })
        .then(() => {
          this.alert = true;
          this.errorStatus = false;
        })
        .catch(error => {
          this.errorStatus = true;
          this.alert = false;
          this.errorText = error.response.data;
        });
    }
  },
  beforeCreate() {
    const url = `reports`;
    //  const url = `v1/settings`;
    this.$store.dispatch("GET_REPORTERS", url);
  }
};
</script>

