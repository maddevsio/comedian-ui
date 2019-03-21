<template lang="html">
<div> 
  <v-form  method="post">
    <v-container>
      <v-layout>
        <v-flex
          xs12
          md4
        >
          <v-text-field
            v-model="bot.team_name"
            :value="data.team_name"
            label="Team Name"
            required
          ></v-text-field>
        </v-flex>

        <v-flex
          xs12
          md4
        >
          <v-text-field
            v-model="bot.password"
            label="Password"
            required
          ></v-text-field>
        </v-flex>

        <v-flex
          xs12
          md4
        >
        <v-select
      v-model="bot.language"
      :items="languages"
      label="Language"
      data-vv-name="select"
      required
    ></v-select>
      </v-flex>      
      </v-layout>
      <v-layout>
      <v-flex
          xs12
          md4
        >
          <v-text-field
            v-model="bot.notifier_interval"
            label="Notifier Interval"
            required
          >{{data.notifier_interval}}</v-text-field>
        </v-flex>
         <v-flex
          xs12
          md4
        >
          <v-text-field
            v-model="bot.reminder_time"
            label="Reminder Time"
            required
          >{{data.reminder_time}}</v-text-field>
        </v-flex>
         <v-flex
          xs12
          md4
        >
          <v-text-field
            v-model="bot.reminder_repeats_max"
            label="Reminder Repeats"
            required
          >{{data.reminder_repeats_max}}</v-text-field>
        </v-flex>
        </v-layout>
    </v-container>
    <v-btn @click='Save'
    >
     Save
    </v-btn>
  </v-form>

 <p>{{bot}}</p>
  </div>
</template>

<script>
import axios from  'axios'
export default {
  data () {
    return {
      languages: [
        'ru_RU',
        'en_EN'
      ],
      data:[],
        bot: {
        team_name: '',
        password: '',
        language:'en_US',
        notifier_interval:'2',
        reminder_time:'2',
        reminder_repeat_max:'1',
        }
      }
    },
  methods: {
     Save() {
      axios.post('https://staging.comedian.maddevs.co/v1/bots/2', {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: {  
          "id": 2,
          "user_id": "",
          "notifier_interval":this.bot.notifier_interval,
          "language": this.bot.language,
          "reminder_repeats_max": this.bot.reminder_repeats_max,
          "reminder_time": this.bot.reminder_time,
          "bot_access_token": "",
          "team_id": "TFREGJ268",
          "team_name": this.bot.team_name,
          "password": this.bot.password },
      });
    }   
  },
  created() {
    axios.get('https://staging.comedian.maddevs.co/v1/bots/2').then((response) => {
      this.bot = response.data
    })
    .catch((e) => {
      // alert(e)
      console.error(e)
    })
  }
}
</script>

<style lang="scss" scoped>

</style>


