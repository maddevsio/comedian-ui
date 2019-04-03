<template lang="html">
  <v-card class="mt-3 mx-auto" max-width="900">
    <v-form method="post">
      <v-container>
        <v-layout>
          <v-flex xs12 md6>
            <v-text-field
              v-model="bot.team_name"
              label="Team Name"
              readonly
            />
          </v-flex>

          <!-- <v-flex xs12 md4>
            <v-text-field
              v-model="newPassword"
              label="Password"
              type="password"
            />
          </v-flex> -->

          <v-flex xs12 md6>
            <v-select
              v-model="bot.language"
              :items="languages"
              label="Language"
              data-vv-name="select"
              required
            />
          </v-flex>                
        </v-layout>
        
        <v-layout>
          <v-flex xs12 md4>            
            <v-text-field
              v-model="bot.notifier_interval"
              label="Notifier Interval"
              type="number" 
              required
            />
          </v-flex>

          <v-flex xs12 md4>
          <v-text-field
            v-model="bot.reminder_time"
            label="Reminder Time"
            type="number"
            required
          />
          </v-flex>

          <v-flex xs12 md4>
            <v-text-field
              v-model="bot.reminder_repeats_max"
              label="Reminder Repeats"
              type="number"
              required
            />
          </v-flex>
        </v-layout>
        <v-btn color="primary white--text" @click='Save'>Save</v-btn>
      </v-container>   
    </v-form>
  </v-card>
</template>

<script>
import transform from "../../helpers/transform";
import { mapState } from "vuex";
import store from "../../store";

export default {
  computed: mapState({
    bot: state => state.bots.bot || {}
  }),
  data() {
    return {
      languages: ["ru_RU", "en_EN"],
      newPassword: ""
    };
  },
  methods: {
    async Save() {
      const botId = this.bot.id;
      const url = `v1/bots/${botId}`;
      this.bot.password = this.newPassword;
      const transformedValues = transform(this.bot, {
        notifier_interval: "int",
        reminder_repeats_max: "int",
        reminder_time: "int"
      });

      await this.$store.dispatch("UPDATE_BOT", {
        url,
        data: {
          bot_access_token: transformedValues.bot_access_token,
          team_name: transformedValues.team_name,
          team_id: transformedValues.team_id,
          password: transformedValues.password,
          language: transformedValues.language,
          notifier_interval: transformedValues.notifier_interval,
          reminder_repeats_max: transformedValues.reminder_repeats_max,
          reminder_time: transformedValues.reminder_time
        }
      });
    }
  },
  beforeCreate() {
    const botId = this.$store.state.user.bot.id;
    const url = `v1/bots/${botId}`;
    this.$store.dispatch("GET_BOT", url);
  }
};
</script>

<style lang="scss" scoped>
</style>
