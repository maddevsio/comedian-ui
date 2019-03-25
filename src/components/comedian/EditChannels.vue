<template lang="html">
<div> 
  <v-form  method="post">
    <v-container>
       <v-layout row justify-center>
        <v-flex
          xs12
          md4
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
    <v-btn @click='Save'
    >
     Save
    </v-btn>
  </v-form>
  </div>
</template>

<script>
import axios from  'axios'
import transform from '../../helpers/transform'
export default {
  data() {
    return{
      channel: []
    }
  },
  methods: {
     Save() {
       const transformedValues = transform(this.channel, {
         channel_standup_time: 'int'
       }) 
      axios.patch(`https://staging.comedian.maddevs.co/v1/channels/${this.$route.params.id}`, {
        ...transformedValues,
      });      
    }   
  },
   created() {
    axios.get(`https://staging.comedian.maddevs.co/v1/channels/${this.$route.params.id}`).then((response) => {
      this.channel = response.data
      console.log(this.channel)
    })
    .catch((e) => {
      console.log(e)
    })
  }
}
</script>
