 <template>
  <div>
    <v-data-table
      :headers="headers"
      :items="standups"
      hide-actions
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.id }}</td>
        <td class="text-xs-right">{{ props.item.user_id }}</td>
        <td class="text-xs-right">{{ props.item.channel_id }}</td>
        <td class="text-xs-right">{{ props.item.created }}</td>
        <td class="text-xs-right">{{ props.item.modified}}</td>
        <td class="text-xs-right">{{ props.item.comment }}</td>
        <td class="text-xs-right">{{ props.item.message_ts }}</td>    
      </template>
    </v-data-table>

    <!-- <div class="text-xs-center pt-3">
      <v-pagination v-model="pagination.page" :total-visible="4" :length="pages"></v-pagination>
    </div> -->
  </div>  
</template>		  

 <script>
import { mapState } from 'vuex'
  export default {
    computed: mapState({
        standups: state => state.standups.standups
    }),
    // computed:{
    //   pages() {
    //     if (this.pagination.rowsPerPage == null ||
    //       this.pagination.totalItems == null
    //     ) return 0

    //     return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    //   },
    //   ...mapState({
    //     standups: state => state.standups.standups
    //     })
    // },
    data () {
      return {
        // pagination: {
        //   rowsPerPage: 3
        // },
        headers: [
          {
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'ID', value: 'id'},
          { text: 'User ID', value: 'user_id'},
          { text: 'Channel ID', value: 'channel_id'},
          { text: 'Created', value: 'created'},
          { text: 'Modified', value: 'modified'},
          { text: 'Text', value: 'comment'},
          { text: 'Options', value: 'message_ts'} 
        ]
      }
    },
    beforeCreate() {
      this.$store.dispatch('GET_STANDUPS')
    }
  }
</script>     

