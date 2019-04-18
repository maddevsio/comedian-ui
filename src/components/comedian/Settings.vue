<template lang="html">
  <v-card class="mt-3 mx-auto" max-width="900">
    <v-form method="post">
    <v-container>
      <v-layout>       
        <v-flex xs12 md5>
          <v-text-field
            v-model="bot.team_id"
            label="Team Id"
            readonly
          />
        </v-flex>   
        <v-flex xs12 md7> 
          <v-text-field
            v-model="bot.bot_access_token"
            label="Bot Access Token"
            readonly
          />
        </v-flex>
      </v-layout> 
      <v-layout>       
          <v-flex xs12 md6>
            <v-select
              v-model="bot.language"
              :items="languages"
              label="Language"
              placeholder="english"
              data-vv-name="select"
              required
            />
          </v-flex>   
          <v-flex xs12 md6> 
            <abbr title="Update notifier interval of the bot">           
            <v-text-field
              v-model="bot.notifier_interval"
              label="Notifier Interval"
              type="number" 
              min="0"
              required
            />
            </abbr>
          </v-flex>
          </v-layout> 
          <v-layout> 
          <v-flex xs12 md6>
          <abbr title="Update reminder time (in minutes) of the bot">     
          <v-text-field
            v-model="bot.reminder_time"
            label="Reminder Time"
            type="number"
            min="0"
            required
          />
          </abbr>
          </v-flex>          
          <v-flex xs12 md6>
            <abbr title="Update maximum reminder attempts of the bot">  
            <v-text-field
              v-model="bot.reminder_repeats_max"
              label="Reminder Repeats"
              type="number"
              min="0"
              required
            />
            </abbr>
          </v-flex>
          </v-layout>             
          <v-layout> 
          <v-flex xs12 md4>
            <v-select
              v-model="bot.reporting_channel"
              :items="channels"
              label="Reporting Channel"
              data-vv-name="select"
            />
          </v-flex>
          <v-flex xs12 md4>
            <v-dialog
              ref="dialog"
              v-model="modal2"
              :return-value.sync="bot.reporting_time"
              persistent
              lazy
              full-width
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="bot.reporting_time"
                  label="Reporting Time"
                  append-icon="access_time"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker v-if="modal2" v-model="bot.reporting_time" full-width>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="$refs.dialog.save(bot.reporting_time)">OK</v-btn>
              </v-time-picker>
            </v-dialog>
          </v-flex>
           <v-flex xs12 md4>
          <v-switch
            v-model="bot.individual_reports_on"
            :label="`Individual Report Status ${bot.individual_reports_on ? 'ON': 'OFF' }`"
          />
        </v-flex>

          </v-layout> 
        <v-btn color="primary white--text" @click='Save'>Save</v-btn>
      </v-layout>  
    </v-container>    
    </v-form>
  </v-card>
</template>

<script>
import transform from "../../helpers/transform";
import { mapState } from "vuex";
import store from "../../store";
import { getItems } from "../../my-getters";
export default {
  computed: mapState({
    bot: state => state.bots.bot || {},
    state: state => state,
    channels: state => {
      const items = getItems(state, "channels");
      let channelNames = [];
      items.forEach(function(item) {
        channelNames.push({ value: item.channel_id, text: item.channel_name });
      });
      return channelNames;
    }
  }),
  data() {
    return {
      modal2: false,
      languages: [
        { value: "ru_RU", text: "русский" },
        { value: "en_EN", text: "english" }
      ]
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
  beforeCreate() {
    const botId = this.$store.state.user.bot.id;
    const url = `v1/bots/${botId}`;
    this.$store.dispatch("GET_BOT", url);
    const channelUrl = "v1/channels";
    this.$store.dispatch("GET_CHANNELS", channelUrl);
  }
};
</script>
