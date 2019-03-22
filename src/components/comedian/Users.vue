<template>
<div>
  <v-data-table
  :headers="headers"
    :items="users"
    class="elevation-1"
  >
   <template v-slot:items="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-left">{{ props.item.id }}</td>
      <td class="text-xs-left">{{ props.item.team_id }}</td>
      <td class="text-xs-left">{{ props.item.user_name }}</td>
      <td class="text-xs-left">{{ props.item.user_id }}</td>
      <td class="text-xs-left">{{ props.item.role }}</td>
      <td class="text-xs-left">{{ props.item.real_name }}</td>
      <td class="text-xs-left">Edit</td>
    </template>   
  </v-data-table>
  <p>{{ errors }}</p>
</div>  
</template>
  
<script>
import axios from  'axios'
  export default {   
    data () {
      return {
        errors:[],
         headers: [
          { 
            text:'Users',
            align: 'center'
          },
          { text: 'ID', value: 'id' },
          { text: 'Team_id', value: 'team_id' },
          { text: 'User_name', value: 'user_name' },
          { text: 'User_id', value: 'user_id' },
          { text: 'Role', value: 'role' },
          { text: 'Real_name', value: 'real_name' },
          { text: 'Options', value: '' }
        ],
        users:[],
      }
    },
    beforeCreate() {
     axios.get('https://staging.comedian.maddevs.co/v1/users').then((response) => {
      this.users = response.data
    })
      .catch((e) => {
        this.errors.push(e);
      })
    }
  }
</script>