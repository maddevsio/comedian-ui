<template>
<div>
  <v-data-table
    :headers="headers"
    :items="channels"
    class="elevation-1"
  >
   <template v-slot:items="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.id }}</td>
      <td class="text-xs-right">{{ props.item.team_id }}</td>
      <td class="text-xs-right">{{ props.item.channel_name }}</td>
      <td class="text-xs-right">{{ props.item.channel_id }}</td>
      <td class="text-xs-right">{{ props.item.channel }}</td>
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
            text: 'Channels',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'ID', value: 'id' },
          { text: 'Team_id', value: 'team_id' },
          { text: 'Channel_name', value: 'channel_name' },
          { text: 'Channel_id', value: 'channel_id' },
          { text: 'Channel', value: 'channel' }
        ],
        channels:[],
      }
    },
    beforeCreate() {
     axios.get('https://staging.comedian.maddevs.co/v1/channels').then((response) => {
      this.channels = response.data
    })
    .catch((e) => {
      this.errors.push(e);
    })
    }
  }
</script>