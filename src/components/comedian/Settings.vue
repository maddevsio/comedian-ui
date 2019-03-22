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
            :value="bot.team_name"
            label="Team Name"
            required
          />
        </v-flex>

        <v-flex
          xs12
          md4
        >
          <v-text-field
            v-model="bot.password"
            label="Password"
            type="password"
            required
          />
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
          />
        </v-flex>
         <v-flex
          xs12
          md4
        >
          <v-text-field
            v-model="bot.reminder_time"
            label="Reminder Time"
            required
          />
        </v-flex>
         <v-flex
          xs12
          md4
        >
          <v-text-field
            v-model="bot.reminder_repeats_max"
            label="Reminder Repeats"
            required
          />
        </v-flex>
        </v-layout>
    </v-container>
    <v-btn @click='Save'
    >
     Save
    </v-btn>
  </v-form>

 <p>{{bot}}</p>
 <p>{{errors}}</p>
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
      errors:[],
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
      /*axios.post('https://staging.comedian.maddevs.co/v1/bots/6', {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: {  
          "id": 6,
          "user_id": "",
          "notifier_interval":this.bot.notifier_interval,
          "language": this.bot.language,
          "reminder_repeats_max": this.bot.reminder_repeats_max,
          "reminder_time": this.bot.reminder_time,
          "bot_access_token": "",
          "team_id": "TFREGJ268",
          "team_name": this.bot.team_name,
          "password": this.bot.password }
      });*/
       const body= {  
          "id": 6,
          "user_id": "",
          "notifier_interval":this.bot.notifier_interval,
          "language": this.bot.language,
          "reminder_repeats_max": this.bot.reminder_repeats_max,
          "reminder_time": this.bot.reminder_time,
          "bot_access_token": "",
          "team_id": "TFREGJ268",
          "team_name": this.bot.team_name,
          "password": this.bot.password 
          }
       this.errors.pop()
       this.errors.push(body)
    }   
  },
  created() {
    axios.get('https://staging.comedian.maddevs.co/v1/bots/6').then((response) => {
      this.bot = response.data
    })
    .catch((e) => {
      this.errors.push(e);
    })
  }
}
</script>

<style lang="scss" scoped>

</style>


