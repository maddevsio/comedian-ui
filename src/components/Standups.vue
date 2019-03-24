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
        
        <div>
         <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editStandup(props.item)"
          >
            edit
          </v-icon>
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
      standups: state => state.standups.standups
    }),

    data () {
      return {
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
  .theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat) {
    background-color: rgb(186, 186, 201);
}
</style>