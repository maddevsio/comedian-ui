<template lang="html">
  <v-card class="mt-12 mx-auto" max-width="1200"> 
    <v-form  method="post">
      <v-container>
        <v-layout row justify-center>
          <v-flex
          >
            <v-text-field
              v-model="channel.channel_standup_time"
              label="Channel Standup Time"
              type="number"
              required
            />
          </v-flex>       
        </v-layout>
      </v-container>
      <v-btn @click='Save'>
      Save
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
import axios from "axios";
import transform from "../../helpers/transform";
import { mapState } from "vuex";

export default {
  computed: mapState({
    channel: state => state.channels.channels
  }),
  methods: {
    async Save() {
      const url = `channels/${this.$route.params.id}`;
      const transformedValues = transform(this.channel, {
        channel_standup_time: "int"
      });

      await this.$store.dispatch("UPDATE_CHANNEL", {
        url,
        data: transformedValues
      });
    }
  },
  beforeCreate() {
    const url = `channels/${this.$route.params.id}`;
    this.$store.dispatch("GET_CHANNELS", url);
  }
};
</script>
