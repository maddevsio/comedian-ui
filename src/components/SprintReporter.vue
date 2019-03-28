<template>
  <v-form method="post">
    <v-container>
      <v-layout>
        <v-flex xs12 md4>
          <v-switch
            v-model="sprintReporter.service_enabled"
            :label="`Service Enabled: ${sprintReporter.service_enabled.toString()}`"
          />
        </v-flex>
        <v-flex xs12 md4>
          <!-- <v-date-picker v-model="sprintReporter.report_time"></v-date-picker> -->
          <Timepicker/>
        </v-flex>
        <v-flex xs12 md4>
          <v-select
            v-model="sprintReporter.report_days"
            :items="sprintReporter.report_days"
            label="days"
            multiple="true"
            data-vv-name="select"
            required
          />
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 md4>
          <v-select
            v-model="sprintReporter.report_channel"
            :items="sprintReporter.report_channel"
            label="channels"
            data-vv-name="select"
            required
          />
        </v-flex>
        <v-flex xs12 md4>
          <v-text-field
            v-model="sprintReporter.task_done_status"
            label="Task Done Status"
            type="string"
            required
          />
        </v-flex>
      </v-layout>
    </v-container>
    <v-btn @click="Save">Save</v-btn>
  </v-form>
</template>
<script>
import Timepicker from "@/components/Timepicker.vue";
export default {
  components: {
    Timepicker
  },
  data() {
    return {
      // picker: new Date().toISOString().substr(0, 10),
      sprintReporter: {
        service_enabled: true,
        report_days: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        report_channel: null,
        task_done_status: "done",
        channels: ["general", "channel1", "channel2"]
      }
    };
  }
};
</script>

