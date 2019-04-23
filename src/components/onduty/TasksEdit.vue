<template>
  <div>
    <Header title="Tasks" :links="this.links"/>
    <v-content fluid fill-height>
      <v-card class="mt-3 mx-auto" max-width="500">
        <v-form method="post">
          <v-container>
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
                data-vv-name="select"
                required
              />
            </v-flex>
            <v-flex xs12 md12>
              <v-switch
                v-model="task.done_status"
                :label="`Task Done Status ${task.done_status ? 'True': 'False' }`"
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
import transform from "../../helpers/transform";
import { getItem, getItems } from "../../my-getters";
import store from "../../store";

export default {
  computed: mapState({
    task() {
      const id = this.$route.params.id;
      let task = getItem(this.$store.state, "tasks", id);
      console.log("task", task);
      return task;
    },
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
    modal2: false,
    menu2: false
  }),
  methods: {
    async Save() {
      const url = `v1/tasks/${this.$route.params.id}`;
      await this.$store
        .dispatch("UPDATE_TASK", {
          url,
          data: this.task
        })
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
  },
  beforeCreate() {
    const url = `v1/tasks/${this.$route.params.id}`;
    this.$store.dispatch("GET_TASK", url);
    const id = this.$route.params.channelId;
    const urlUsers = `v1/channels/${id}/standupers`;
    this.$store.dispatch("GET_CHANNEL_STANDUPERS", urlUsers);
  }
};
</script>
