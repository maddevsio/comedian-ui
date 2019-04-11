<template>
  <div>
    <Header title="Tasks" :links="this.links" :navLinks="this.navLinks"/>
    <v-content fluid fill-height>
      <v-card class="mt-3 mx-auto" max-width="500">
        <v-form method="post">
          <v-container>
            <v-flex xs12 md12>
              <v-select
                v-model="task.channel"
                :items="channels"
                label="Channel"
                data-vv-name="select"
                required
              />
            </v-flex>
            <v-flex xs12 md12>
              <v-text-field v-model="task.description" label="Description" type="text" required/>
            </v-flex>
            <v-flex xs12 md12>
              <abbr title="Update reminder time (in minutes) of the task">
                <v-text-field
                  v-model="task.reminder_interval"
                  label="Reminder Interval"
                  type="number"
                  min="0"
                  required
                />
              </abbr>
            </v-flex>
            <v-flex xs12 md12>
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="task.deadline"
                    label="Deadline"
                    append-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="task.deadline" @input="menu2 = false"></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 md12>
              <v-text-field v-model="task.report_to" label="Report To" required/>
            </v-flex>
            <v-btn block color="primary" @click="Save">Save</v-btn>
          </v-container>
        </v-form>
      </v-card>
    </v-content>
    <v-layout>
      <v-alert v-model="alert" dismissible type="success">Successfully saved</v-alert>
    </v-layout>
    <v-layout>
      <v-alert v-model="errorStatus" dismissible type="error">{{errorText}}</v-alert>
    </v-layout>
  </div>
</template>

<script>
import Header from "@/components/navigation/Header.vue";
import { mapState } from "vuex";
import transform from "../../helpers/transform";
import { getItems } from "../../my-getters";
import store from "../../store";

export default {
  computed: {
    links() {
      return this.$store.state.links.linksHeader;
    },
    navLinks() {
      return this.$store.state.links.onDutySideLinks;
    }
  },
  components: {
    Header
  },
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    modal: false,
    menu2: false,
    task: {
      team_name: "",
      team_id: "",
      channel: "",
      description: "",
      deadline: "",
      reminder_interval: 0,
      report_to: ""
    },
    channels: ["channel1", "channrl2", "channel3"],
    alert: false,
    errorStatus: false,
    errorText: ""
  }),
  methods: {
    async Save() {
      this.task.team_name = store.state.user.bot.team_name;
      this.task.team_id = store.state.user.bot.team_id;
      this.task.reminder_interval = parseInt(this.task.reminder_interval);
      const transformedValues = transform(this.task, {});
      await this.$store
        .dispatch("ADD_TASK", this.task)
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
  }
};
</script>
