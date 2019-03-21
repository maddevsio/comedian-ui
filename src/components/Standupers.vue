<template>
  <v-data-table
    :headers="headers"
    :items="standupers"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.slack_id }}</td>
      <td class="text-xs-right">{{ props.item.channel_id }}</td>
      <td class="text-xs-right">{{ props.item.role }}</td>
      <td class="text-xs-right">{{ props.item.submitted_standup }}</td>
      <td class="text-xs-right">{{ props.item.created }}</td>
      <td class="text-xs-right">{{ props.item.options }}</td>
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
            text: 'ID',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Slack ID', value: 'slack_id' },
          { text: 'Channel ID', value: 'channel_id' },
          { text: 'Role', value: 'role' },
          { text: 'Submitted Standup', value: 'submitted_standup' },
          { text: 'Created', value: 'created' },
          { text: 'Options', value: 'options' }
        ]
      }
    },
    beforeCreate() {
    this.$store.dispatch('GET_STANDUPERS')
    }
  }
</script>