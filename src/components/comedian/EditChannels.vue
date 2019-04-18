<template lang="html">
  <v-card class="mt-12 mx-auto" max-width="1200"> 
    <v-form  method="post">
      <v-container>
        <v-layout row justify-center>
          <v-dialog
            ref="dialog"
            v-model="modal2"
            :return-value.sync="channel.channel_standup_time"
            persistent
            lazy
            full-width
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="channel.channel_standup_time"
                label="Channel Standup Time"
                append-icon="access_time"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker v-if="modal2" v-model="channel.channel_standup_time" full-width>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="$refs.dialog.save(channel.channel_standup_time)">OK</v-btn>
            </v-time-picker>
          </v-dialog>
        </v-layout>
        <v-btn @click='Save'>
        Save
        </v-btn>
      </v-container>      
    </v-form>
  </v-card>
</template>

<script>
import transform from "../../helpers/transform";
import { mapState } from "vuex";
import { getItems } from "../../my-getters";

export default {
  computed: mapState({
    channel: state => {
      const items = getItems(state, "channels");
      return items;
    }
  }),
  methods: {
    async Save() {
      const url = `v1/channels/${this.$route.params.id}`;
      const transformedValues = transform(this.channel, {});

      await this.$store
        .dispatch("UPDATE_CHANNEL", {
          url,
          data: transformedValues
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
  data() {
    return {
      modal2: false
    };
  },
  beforeCreate() {
    const url = `v1/channels/${this.$route.params.id}`;
    this.$store.dispatch("GET_CHANNELS", url);
  }
};
</script>
