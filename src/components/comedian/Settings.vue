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
            <abbr title="Update notifier interval of the bot">           
            <v-text-field
              v-model="bot.notifier_interval"
              label="Notifier Interval"
              
              type="number" 
              required
            />
            </abbr>
          </v-flex>

          <v-flex xs12 md4>
          <abbr title="Update reminder time (in minutes) of the bot">     
          <v-text-field
            v-model="bot.reminder_time"
            label="Reminder Time"
            type="number"
            required
          />
          </abbr>
          </v-flex>

          <v-flex xs12 md4>
            <abbr title="Update maximum reminder attempts of the bot">  
            <v-text-field
              v-model="bot.reminder_repeats_max"
              label="Reminder Repeats"
              type="number"
              required
            />
            </abbr>
          </v-flex>
        </v-layout>
        <v-btn color="primary white--text" @click='Save'>Save</v-btn>
      </v-container>   
    </v-form>
    {{ state }}
    <v-layout> 
      <v-alert
        v-model="alert"
        dismissible
        type="success"
      >
        Successfully saved
      </v-alert>
    </v-layout> 
    <v-layout> 
      <v-alert
        v-model="errorStatus"
        dismissible
        type="error"
      >
        {{errorText}}
      </v-alert>
    </v-layout> 
  </v-card>
</template>

<script>
import transform from "../../helpers/transform";
import { mapState } from "vuex";
import store from "../../store";

export default {
  computed: mapState({
    bot: state => state.bots.bot || {},
    state: state => state
  }),
  data() {
    return {
      languages: ["ru_RU", "en_EN"],
      newPassword: "",
      alert: false,
      errorStatus: false,
      errorText: ""
    };
  },
  methods: {
    async Save() {
      const botId = this.bot.id;
      const url = `v1/bots/${botId}`;
      const transformedValues = transform(this.bot, {
        notifier_interval: "int",
        reminder_repeats_max: "int",
        reminder_time: "int"
      });

      await this.$store
        .dispatch("UPDATE_BOT", {
          url,
          data: {
            transformedValues
          }
        })
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
    const botId = this.$store.state.user.bot.id;
    const url = `v1/bots/${botId}`;
    this.$store.dispatch("GET_BOT", url);
  }
};
</script>

<style lang="scss" scoped>
</style>
