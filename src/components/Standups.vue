 <template>
  <div>
    <h2 class="standups_title">{{ title }}</h2>
    <v-data-table
      :headers="headers"
      :items="standups"     
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td >{{ props.item.id }}</td>
        <td >{{ props.item.user_id }}</td>
        <td >{{ props.item.channel_id }}</td>
        <td >{{ props.item.created }}</td>
        <td >{{ props.item.modified}}</td>
        <td >{{ props.item.comment }}</td>    
       
   <div class="text-xs-center">
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <template v-slot:activator="{ on }">          
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
   </div>

      </template>
    </v-data-table>   
  </div>  
</template>		  

<script>
  import { mapState } from 'vuex'
  export default {
    computed: mapState({
      standups: state => state.standups.standups
    }),

    data () {
      return {
        dialog: false,
        title:'Standups',       
        headers: [
          { text: 'ID', value: 'id'},
          { text: 'User ID', value: 'user_id'},
          { text: 'Channel ID', value: 'channel_id'},
          { text: 'Created', value: 'created'},
          { text: 'Modified', value: 'modified'},
          { text: 'Text', value: 'comment'},
          { text: 'Options'} 
        ]
      }
    },
    
    methods: {
      deleteStandup(value) {
        console.log(value)
        this.$store.dispatch('REMOVE_STANDUP', value.id)
      },
      editStandup(value) {
        // TODO go to view or edit page
        console.log(value)
      },      
    },    
    beforeCreate() {
      this.$store.dispatch('GET_STANDUPS')
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