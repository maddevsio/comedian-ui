<template>
  <div>
    <Header title="Add On Duty" :links="this.links" :navLinks="this.navLinks"/>
    <v-content fluid fill-height>
      <v-card class="mt-3 mx-auto" max-width="500">
        <v-form method="post">
          <v-container>
            <v-flex xs12 md12>
              <v-select
                v-model="onduty.channel"
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
                :items="members_order"
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
                :items="members_order"
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
        <v-layout>
          <v-alert v-model="alert" dismissible type="success">Successfully saved</v-alert>
        </v-layout>
        <v-layout>
          <v-alert v-model="errorStatus" dismissible type="error">{{errorText}}</v-alert>
        </v-layout>
      </v-card>
    </v-content>
  </div>
</template>


<script>
import Header from "@/components/navigation/Header.vue";
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
        channelNames.push(item.channel_name);
      });
      return channelNames;
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
      alert: false,
      errorStatus: false,
      errorText: "",
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
      algorithm: ["0", "1", "2"],
      languages: ["en_EN", "ru_RU"],
      members_order: ["u1", "u2", "u3"]
    };
  },
  methods: {
    async Save() {
      const team_id = store.state.user.bot.team_id;
      const team_name = store.state.user.bot.team_name;
      this.onduty.team_name = store.state.user.bot.team_name;
      this.onduty.team_id = team_id;
      //   this.onduty.members_order = this.onduty.members_order.join(",");
      this.onduty.algorithm = parseInt(this.onduty.algorithm);

      this.onduty.bot_access_token = store.state.user.bot.bot_access_token;
      const transformedValues = transform(this.onduty, {});

      this.$store
        .dispatch("ADD_ONDUTY", transformedValues)
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
    const url = "v1/channels";
    this.$store.dispatch("GET_CHANNELS", url);
  }
};
</script>
