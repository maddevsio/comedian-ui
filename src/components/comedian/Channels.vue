<template>
  <v-card class="mt-3 mx-auto" max-width="1200">
    <v-data-table
      :headers="headers"
      :items="channels"
      class="elevation-1 text-uppercase font-weight-medium"
      :rows-per-page-items="this.rows"
    >
      <template v-slot:items="props">
        <td class="text-xs-left text-lowercase">{{ props.item.team_id }}</td>
        <td class="text-xs-left text-lowercase">{{ props.item.channel_name }}</td>
        <td class="text-xs-left text-lowercase">{{ props.item.channel_id }}</td>
        <td class="text-xs-left text-lowercase">{{ props.item.channel_standup_time }}</td>
        <!-- <td class="text-xs-left">
          <v-icon small class="mr-2" @click="edit(props.item.id)">edit</v-icon>
          <v-icon small @click="delete(props.item.id)">delete</v-icon>
        </td>-->
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import { getItems } from "../../my-getters";

export default {
  computed: mapState({
    channels: state => {
      const items = getItems(state, "channels");
      return items;
    }
  }),
  data() {
    return {
      headers: [
        { text: "Team Id", value: "team_id" },
        { text: "Channel Name", value: "channel_name" },
        { text: "Channel Id", value: "channel_id" },
        { text: "Channel Standup Time", value: "channel_standup_time" }
        // { text: "Actions", value: "" }
      ],
      rows: [
        25,
        50,
        100,
        { text: "$vuetify.dataIterator.rowsPerPageAll", value: -1 }
      ]
    };
  },
  beforeCreate() {
    const url = "v1/channels";
    this.$store.dispatch("GET_CHANNELS", url);
  },
  methods: {
    edit(id) {
      this.$router.push({ name: "edit", params: { id: id } });
    },
    delete(id) {
      return;
      const url = `v1/channels/${id}`;
      this.$store.dispatch("REMOVE_CHANNEL", { url });
    }
  }
};
</script>
