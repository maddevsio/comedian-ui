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
            v-model="user.role"
            label="User Role"
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
      user: []
    }
  },
  methods: {
     Save() {
       const transformedValues = transform(this.user, {
         channel_standup_time: 'int'
       }) 
      axios.patch(`https://staging.comedian.maddevs.co/v1/users/${this.$route.params.id}`, {
        ...transformedValues,
      }).then(()=> {
        alert("Изменения сохранены")
      });        
    }   
  },
   created() {
    axios.get(`https://staging.comedian.maddevs.co/v1/users/${this.$route.params.id}`).then((response) => {
      this.user = response.data
      console.log(this.user)
    })
    .catch((e) => {
      console.log(e)
    })
  }
}
</script>
