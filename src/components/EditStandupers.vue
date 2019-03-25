<template>
<div> 
  <v-form  method="post">
    <v-container>
       <v-layout row justify-center>
        <v-flex
          xs12
          md4
        >
          <v-text-field
            v-model="standupers.id"
            label="ID"
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
import axios from 'axios'
import transform from '../../helpers/transform'
export default {
  data() {
    return{
     standupers: []
    }
  },
  methods: {
     Save() {
       const transformedValues = transform(this.standupers, {
         member_standup_time: 'int'
       }) 
      axios.patch(`https://staging.comedian.maddevs.co/v1/standupers/${this.$route.params.id}`, {
        ...transformedValues,
      }).then(()=> {
        alert("Изменения сохранены")
      });        
    }   
  }  
}
</script>
