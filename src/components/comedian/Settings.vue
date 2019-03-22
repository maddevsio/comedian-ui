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
            type="number"
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
            type="number"
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
            type="number"
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
import transform from '../../helpers/transform'
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
       const transformedValues = transform(this.bot, {
         notifier_interval: 'int',
         reminder_repeats_max: 'int',
         reminder_time: 'int',
       })
  
      axios.post(`https://staging.comedian.maddevs.co/v1/bots/${this.$route.params.id}`, {
        ...transformedValues,
      });      
       this.errors.pop()
    }   
  },
  created() {
    axios.get(`https://staging.comedian.maddevs.co/v1/bots/${this.$route.params.id}`).then((response) => {
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


