<template>
  <div>
    <Header title="Add Sprint Report" :links="this.links" :navLinks="this.navLinks"/>
    <v-content fluid fill-height>
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
              <v-select
                v-model="sprintReporter.language"
                :items="languages"
                label="Language"
                data-vv-name="select"
                required
              />
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
    </v-content>
  </div>
</template>


<script>
import Header from "@/components/navigation/Header.vue";
import store from "../../store";

export default {
  computed: {
    links() {
      return this.$store.state.links.linksHeader;
    },
    navLinks() {
      return this.$store.state.links.adminSideLinks;
    }
  },
  components: {
    Header
  },
  data() {
    return {
      sprintReporter: {
        team_id: "",
        language: "en_US",
        report_time: "",
        service_enabled: true,
        report_days: [],
        report_channel: null,
        task_done_status: "done"
      },
      modal2: false,
      channels: ["general", "channel1", "channel2"],
      languages: ["en_EN", "ru_RU"],
      days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ]
    };
  },
  methods: {
    async Save() {
      const team_id = store.state.user.bot.team_id;
      this.sprintReporter.team_name = store.state.user.bot.team_name;
      this.sprintReporter.team_id = team_id;
      this.sprintReporter.report_days = this.sprintReporter.report_days.join(
        ","
      );
      this.sprintReporter.bot_access_token =
        store.state.user.bot.bot_access_token;
      this.$store
        .dispatch("ADD_SPRINTREPORTER", this.sprintReporter)
        .then(() => {
          this.flashMessage.success({
            title: "",
            message: "Successfully saved"
          });
        })
        .catch(error => {
          this.flashMessage.error({
            title: error.name || "Error",
            message: error.response.data
          });
        });
    }
  }
};
</script>
