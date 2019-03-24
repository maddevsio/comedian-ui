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
     
      <v-icon
        small
        @click="deleteStandup(props.item)"
      >
        delete
      </v-icon>
    </td>
      </div>

  <div class="text-xs-center">
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <template v-slot:activator="{ on }">
          <!-- <v-btn
            color="red lighten-2"
            dark
            v-on="on"
          >
            Click Me
          </v-btn> -->
          <v-icon
        small
        class="mr-2"
        v-on="on"
        @click="editStandup(props.item)"
      >
        edit
      </v-icon>

        </template>
  
        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
          >
            Privacy Policy
          </v-card-title>
  
          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </v-card-text>
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              flat
              @click="dialog = false"
            >
              I accept
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
   
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
td {
  text-align: left;
}
  
</style>