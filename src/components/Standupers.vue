<template>
  <v-data-table
    :headers="headers"
    :items="standupers"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.id }}</td>
      <td class="text-xs-right">{{ props.item.user_id }}</td>
      <td class="text-xs-right">{{ props.item.team_id }}</td>
      <td class="text-xs-right">{{ props.item.channel_id }}</td>
      <td class="text-xs-right">{{ props.item.role_in_channel }}</td>
      <td class="text-xs-right">{{ props.item.submitted_standup_today }}</td>
      <td class="text-xs-right">{{ props.item.created }}</td>
    </template>
  </v-data-table>
</template>

<script>
import { mapState } from 'vuex'
  export default {
    computed: mapState({
        standupers: state => state.standuper.standupers
    }),
    data () {
      return {
        headers: [
          {           
            align: 'left',
            sortable: false,
            value: 'name'
          },
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