<template>
  <div>
    <Header title="Tasks" :links="this.links"/>
    <v-content fluid fill-height>
      <v-card class="mt-3 mx-auto" max-width="500">
        <v-form method="post" lazy-validation ref="form" v-model="valid">
          <v-container>
            <v-flex xs12 md12>
              <v-text-field
                v-model="task.description"
                label="Description"
                :counter="10"
                :rules="minLength"
                type="text"
                required
              />
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
              <v-dialog
                ref="dialog"
                v-model="modal2"
                :return-value.sync="task.deadline"
                persistent
                lazy
                full-width
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="task.deadline"
                    label="Deadline"
                    append-icon="access_time"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker v-if="modal2" v-model="task.deadline" full-width>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="$refs.dialog.save(task.deadline)">OK</v-btn>
                </v-time-picker>
              </v-dialog>
            </v-flex>
            <v-flex xs12 md12>
              <v-select
                v-model="task.report_to"
                label="Report To"
                :items="users"
                :rules="required"
                data-vv-name="select"
                required
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
import Header from "@/components/navigation/HeaderOnDuty.vue";
import { mapState } from "vuex";
import { getItems } from "../../my-getters";
import store from "../../store";

export default {
  computed: mapState({
    links() {
      return this.$store.state.links.linksHeader;
    },
    navLinks() {
      return this.$store.state.links.onDutySideLinks;
    },
    users: state => {
      const usersObjects = getItems(state, "channelStandupers") || [];
      return usersObjects.map(item => ({
        value: item.user_id,
        text: item.real_name
      }));
    }
  }),
  components: {
    Header
  },
  data: () => ({
    valid: true,
    menu2: false,
    modal2: false,
    required: [v => !!v || "This field is required"],
    minLength: [
      v => (v && v.length >= 10) || "This field must be more than 10 characters"
    ],
    task: {
      team_name: "",
      team_id: "",
      description: "",
      deadline: "",
      reminder_interval: 0,
      report_to: null
    }
  }),
  methods: {
    async Save() {
      if (this.validate()) {
        this.task.channel = this.$route.params.channel_id;
        this.task.team_name = store.state.user.bot.team_name;
        this.task.team_id = store.state.user.bot.team_id;
        this.task.reminder_interval = parseInt(this.task.reminder_interval);
        await this.$store
          .dispatch("ADD_TASK", this.task)
          .then(() => {
            this.flashMessage.success({
              title: "",
              message: "Successfully saved"
            });
          })
          .catch(error => {
            this.flashMessage.error({
              title: error.name || "Error",
              message: error.response.data || "Error"
            });
          });
      } else {
        this.flashMessage.error({
          title: "Form validation",
          message: "Please, fill all fields correctly"
        });
      }
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        return true;
      }
      return false;
    }
  },
  beforeCreate() {
    const id = this.$route.params.id;
    const urlUsers = `v1/channels/${id}/standupers`;
    this.$store.dispatch("GET_CHANNEL_STANDUPERS", urlUsers);
  }
};
</script>
