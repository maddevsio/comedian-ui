 <template>
  <v-data-table
    :headers="headers"
    :items="standups"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.User }}</td>
      <td class="text-xs-right">{{ props.item.Channel }}</td>
      <td class="text-xs-right">{{ props.item.Modified }}</td>
      <td class="text-xs-right">{{ props.item.Text }}</td>
      <td class="text-xs-right">{{ props.item.Options }}</td>    
    </template>
  </v-data-table>
</template>		  

 <script>
import { mapState } from 'vuex'
  export default {
    computed: mapState({
        standups: state => state.standups.standups
    }),
    data () {
      return {
        headers: [
          {
            text: 'ID',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'User ID', value: 'user_id' },
          { text: 'Channel ID', value: 'channel_id' },
          { text: 'Modified', value: 'modified' },
          { text: 'Text', value: 'text' },
          { text: 'Options', value: 'options' }         
        ]
      }
    },
    beforeCreate() {
    this.$store.dispatch('GET_STANDUPS')
    }
  }
</script>     

