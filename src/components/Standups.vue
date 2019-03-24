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
          <v-btn v-on:click="editStandup(props.item.comment)">edit</v-btn>
          <v-btn v-on:click="deleteStandup(props.item.id)">remove</v-btn>
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
      deleteStandup(id) {
        this.$store.dispatch('REMOVE_STANDUP', id)
      },
      editStandup(comment) {
        this.$store.dispatch('POST_STANDUP', comment)
      },      
    },    
    beforeCreate() {
      this.$store.dispatch('GET_STANDUPS')
    }
  }
</script>    