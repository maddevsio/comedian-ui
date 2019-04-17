<template>
  <div>
    <div v-if="sprintReporter">
      <v-card class="mt-3 mx-auto" max-width="500">
        <v-form method="post">
          <v-container>
            <v-flex xs12 md12>
              <v-select
                v-model="sprintReporter.report_channel"
                :items="channels"
                label="Channels"
                data-vv-name="select"
                required
              />
            </v-flex>
            <v-flex xs12 md12>
              <v-select
                v-model="sprintReporter.report_days"
                :items="days"
                label="Days"
                multiple
                data-vv-name="select"
                required
              />
            </v-flex>
            <v-flex xs12 md12>
              <v-dialog
                ref="dialog"
                v-model="modal2"
                :return-value.sync="sprintReporter.report_time"
                persistent
                lazy
                full-width
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="sprintReporter.report_time"
                    label="Time"
                    append-icon="access_time"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker v-if="modal2" v-model="sprintReporter.report_time" full-width>
                  <v-spacer></v-spacer>
                  <v-btn
                    flat
                    color="primary"
                    @click="$refs.dialog.save(sprintReporter.report_time)"
                  >OK</v-btn>
                </v-time-picker>
              </v-dialog>
            </v-flex>
            <v-flex xs12 md12>
              <v-text-field
                v-model="sprintReporter.task_done_status"
                label="Task Done Status"
                type="string"
                required
              />
            </v-flex>
            <v-flex xs12 md12>
              <v-switch
                v-model="sprintReporter.service_enabled"
                :label="`${sprintReporter.service_enabled ? ' Service Enabled': 'Service Disabled' }`"
              />
            </v-flex>
            <v-btn block color="primary" @click="Save">Save</v-btn>
          </v-container>
        </v-form>
      </v-card>
      <v-layout>
        <v-alert v-model="alert" dismissible type="success">Successfully saved</v-alert>
      </v-layout>
      <v-layout>
        <v-alert v-model="errorStatus" dismissible type="error">{{errorText}}</v-alert>
      </v-layout>
    </div>
    <div v-else>
      <v-card class="mt-3 mx-auto" max-width="400">
        <v-alert :value="true" color="warning" icon="priority_high" outline>Service is disabled</v-alert>
      </v-card>
    </div>
  </div>
</template>
<script>
import transform from "../helpers/transform";
import { patch } from "../helpers/requests";
import store from "../store";
import { mapState } from "vuex";
import { getItems } from "../my-getters";

export default {
  computed: mapState({
    channels: state => {
      const items = getItems(state, "channels");
      let channelNames = [];
      items.forEach(function(item) {
        channelNames.push(item.channel_name);
      });
      return channelNames;
    },
    sprintReporter: state => {
      if (!state.sprintReporter) {
        return null;
      }
      const formatTime = time => {
        if (!time) {
          return null;
        }
        if (time.length !== 5) {
          return null;
        }

        const splitted = time.split(":");
        if (
          splitted.length !== 2 ||
          splitted[0].length !== 2 ||
          splitted[1].length !== 2
        ) {
          return null;
        }

        return time;
      };
      // FIXME
      const entities = state.sprintReporter.entities;
      if (typeof entities.report_days === "string") {
        const weekdays = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ];
        const intDays = entities.report_days.split(",");
        entities.report_days = [];
        for (let i = 0; i < intDays.length; ++i) {
          if (intDays[i] > 0) {
            entities.report_days.push(weekdays[i]);
          }
        }
      }
      entities.report_time = formatTime(entities.report_time);
      return entities;
    },
    isShown: state => {
      return (
        state.sprintReporter.entities.length != 0 ||
        typeof state.sprintReporter != undefined
      );
    }
  }),
  data() {
    return {
      modal2: false,
      days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      alert: false,
      errorStatus: false,
      errorText: ""
    };
  },
  methods: {
    async Save() {
      const teamId = store.state.user.bot.team_id;
      const url = `v1/configurations/${teamId}`;

      const transformedValues = transform(this.sprintReporter, {
        report_days: "weekdays"
      });
      await this.$store
        .dispatch("UPDATE_SPRINTREPORTER", {
          url,
          data: transformedValues
        })
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
    const teamId = store.state.user.bot.team_id;
    const url = `v1/configurations/${teamId}`;
    this.$store.dispatch("GET_SPRINTREPORTER", url);
    const urlChannels = "v1/channels";
    this.$store.dispatch("GET_CHANNELS", urlChannels);
  }
};
</script>
