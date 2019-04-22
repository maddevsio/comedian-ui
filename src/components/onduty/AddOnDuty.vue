<template>
  <div>
    <Header title="Add On Duty" :links="this.links"/>
    <v-content fluid fill-height>
      <v-card class="mt-3 mx-auto" max-width="500">
        <v-form method="post">
          <v-container>
            <v-flex xs12 md12>
              <v-select
                v-model="channel"
                :items="channels"
                label="Channels"
                data-vv-name="select"
                required
                return-object
                @change="getUsers"
              />
            </v-flex>
            <v-flex xs12 md12>
              <v-dialog
                ref="dialog"
                v-model="modal2"
                :return-value.sync="onduty.notification_time"
                persistent
                lazy
                full-width
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="onduty.notification_time"
                    label="Time"
                    append-icon="access_time"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker v-if="modal2" v-model="onduty.notification_time" full-width>
                  <v-spacer></v-spacer>
                  <v-btn
                    flat
                    color="primary"
                    @click="$refs.dialog.save(onduty.notification_time)"
                  >OK</v-btn>
                </v-time-picker>
              </v-dialog>
            </v-flex>
            <v-flex xs12 md12>
              <v-select
                v-model="onduty.members_order"
                :items="users"
                label="Members Order"
                data-vv-name="select"
                multiple
                required
              />
            </v-flex>
            <v-flex xs12 md12>
              <v-select
                v-model="onduty.algorithm"
                :items="algorithm"
                label="Algorithm"
                data-vv-name="select"
                required
              />
            </v-flex>
            <v-flex xs12 md12>
              <v-select
                v-model="onduty.current_onduty"
                label="Current Onduty"
                :items="users"
                data-vv-name="select"
                required
              />
            </v-flex>
            <v-flex xs12 md12>
              <v-select
                v-model="onduty.language"
                :items="languages"
                label="Language"
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
import axios from "axios";
import store from "../../store";
import { mapState } from "vuex";
import { getItems } from "../../my-getters";
import transform from "../../helpers/transform";

export default {
  computed: mapState({
    channels: state => {
      const items = getItems(state, "channels");
      let channelNames = [];
      items.forEach(function(item) {
        channelNames.push({
          value: item.id,
          text: item.channel_name,
          id: item.channel_id
        });
      });
      return channelNames;
    },
    users: state => {
      const usersObjects = getItems(store.state, "channelStandupers") || [];
      console.log("usersObjects", usersObjects);
      return usersObjects.map(item => ({
        value: item.user_id,
        text: item.real_name
      }));
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
      onduty: {
        team_id: "",
        team_name: "",
        channel: "",
        language: "en_US",
        notification_time: "",
        members_order: [],
        algorithm: 0,
        current_onduty: ""
      },
      modal2: false,
      algorithm: [
        { value: "0", text: "working days" },
        { value: "1", text: "every day" },
        { value: "2", text: "Friday and weekends" }
      ],
      languages: [
        { value: "ru_RU", text: "русский" },
        { value: "en_EN", text: "english" }
      ],
      channel: {}
    };
  },
  methods: {
    async Save() {
      const team_id = store.state.user.bot.team_id;
      const team_name = store.state.user.bot.team_name;
      this.onduty.team_name = store.state.user.bot.team_name;
      this.onduty.team_id = team_id;
      // this.onduty.members_order = this.onduty.members_order.join(",");
      this.onduty.channel = this.channel.id;
      this.onduty.algorithm = parseInt(this.onduty.algorithm);

      this.onduty.bot_access_token = store.state.user.bot.bot_access_token;
      const transformedValues = transform(this.onduty, {});

      this.$store
        .dispatch("ADD_ONDUTY", transformedValues)
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
    },
    getUsers() {
      const urlUsers = `v1/channels/${this.channel.value}/standupers`;
      this.$store.dispatch("GET_CHANNEL_STANDUPERS", urlUsers);
    }
  },
  beforeCreate() {
    const url = "v1/channels";
    this.$store.dispatch("GET_CHANNELS", url);
  }
};
</script>
