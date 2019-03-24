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
      <td >{{ props.item.team_id }}</td>
      <td >{{ props.item.channel_id }}</td>
      <td >{{ props.item.role_in_channel }}</td>
      <td> {{ props.item.submitted_standup_today }}</td>
      <!-- <td >{{ props.item.created }}</td> -->
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
        title: 'Standupers',
        headers: [
        
          { text: 'ID', value: 'id' },
          { text: 'User ID', value: 'user_id' },
          { text: 'Team ID', value: 'team_id' },
          { text: 'Channel ID', value: 'channel_id' },
          { text: 'Role in channel', value: 'role_in_channel' },
          { text: 'Submitted Standup today', value: 'submitted_standup_today' },
          { text: 'Created', value: 'created' }
        ]
      }
    },
    beforeCreate() {
    this.$store.dispatch('GET_STANDUPERS')
    }
  }
</script>
<style>
td {
  text-align: left;
}
  
</style>