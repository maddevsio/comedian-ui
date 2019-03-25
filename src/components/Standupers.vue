<template>
 <div>
   <h2 class="standupers_title">{{ title }}</h2>
  <v-data-table
    :headers="headers"
    :items="standupers"
    class="elevation-1"
  >
    <template v-slot:items="props">     
      <td >{{ props.item.id }}</td>
      <td >{{ props.item.user_id }}</td>
      <td >{{ props.item.channel_id }}</td>
      <td >{{ props.item.role_in_channel }}</td>
      <td >{{ props.item.submitted_standup_today }}</td>
      <td >{{ props.item.created }}</td>      
     
   <div>
      <td class="justify-center layout px-0"> 
           <router-link :to="{ name:'users_edit', params: { id: props.item.id } }"><i class="material-icons option-btn">edit</i></router-link>    
      <v-icon
        small
        @click="deleteStandup(props.item)"
      >
        delete
      </v-icon>
    </td>
   </div> 

    </template>
  </v-data-table>
 </div>
</template>

<script>
import { mapState } from 'vuex'
  export default {
    computed: mapState({
        standupers: state => state.standuper.standupers
    }),
    data () {
      return {
        dialog: false,
        title: 'Standupers',
        headers: [
        
          { text: 'ID', value: 'id' },
          { text: 'Slack ID', value: 'user_id' },         
          { text: 'Channel ID', value: 'channel_id' },
          { text: 'Role in channel', value: 'role_in_channel' },
          { text: 'Submitted Standup today', value: 'submitted_standup_today' },
          { text: 'Created', value: 'created' },
          { text: 'Options'} 
        ]
      }
    },
    beforeCreate() {
    this.$store.dispatch('GET_STANDUPERS')
    }
  }
</script>
<style>
.text-xs-center {
  display: flex;
  margin-left: 27px;
} 

.theme--light.v-datatable thead th.column.sortable.active, .theme--light.v-datatable thead th.column.sortable.active .v-icon, .theme--light.v-datatable thead th.column.sortable:hover {
  color: rgba(10, 7, 32, 0.87);
  font-size: 15px;
}
</style>