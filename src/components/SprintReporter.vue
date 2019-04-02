<template>
  <div>
    <v-card class="mt-3 mx-auto" max-width="500" v-if="sprintReporter">
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
                  readonly
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
import transform from "../helpers/transform";
import { patch } from "../helpers/requests";
import store from "../store";
import { mapState } from "vuex";

export default {
  computed: mapState({
    sprintReporter: state => {
      if (!state.sprintReporter) {
        return null;
      }
      // FIXME
      const entities = state.sprintReporter.entities;
      if (typeof entities.report_days === "string") {
        console.log(">>>>>>", entities.report_days);
        entities.report_days = entities.report_days.split(",");
      }
      return entities;
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
      channels: ["general", "channel1", "channel2"]
    };
  },
  methods: {
    async Save() {
      const id = this.sprintReporter.id;
      const url = `v1/configurations/${id}`;
      var report_days = "";
      // this.sprintReporter.report_days.forEach(element => {
      //   report_days = report_days + "," + element;
      // });
      // for (
      //   var i = 0, len = this.sprintReporter.report_days.length;
      //   i < len;
      //   i++
      // ) {
      //   report_days = report_days + "," + this.sprintReporter.report_days[i];
      //   console.log(report_days);
      // }
      // this.sprintReporter.report_days = Object.values(
      //   this.sprintReporter.report_days
      // ).join(",");
      this.sprintReporter.report_days = this.sprintReporter.report_days.join(
        ","
      );
      const transformedValues = transform(this.sprintReporter, {});
      await this.$store.dispatch("UPDATE_SPRINTREPORTERS", {
        url,
        data: transformedValues
      });
    }
  },
  beforeCreate() {
    const team_id = store.state.user.bot.team_id;
    const url = `v1/configurations/${team_id}`;
    console.log(url);
    this.$store.dispatch("GET_SPRINTREPORTERS", url);
  }
};
</script>
