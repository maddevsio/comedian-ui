<template>
  <v-card class="mt-3 mx-auto" max-width="1200">
    <v-data-table
      :headers="headers"
      :items="standupers"
      class="elevation-1 text-uppercase font-weight-medium"
      :rows-per-page-items="this.rows"
    >
      <template v-slot:items="props">
        <td class="text-xs-left text-lowercase">{{ props.item.user_id }}</td>
        <td class="text-xs-left text-lowercase">{{ props.item.channel_id }}</td>
        <td class="text-xs-left text-lowercase">{{ props.item.role_in_channel }}</td>
        <td class="text-xs-left text-lowercase">{{ props.item.submitted_standup_today }}</td>
        <td class="text-xs-left text-lowercase">{{ props.item.created }}</td>
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
import { getItems } from "../my-getters";
export default {
  computed: mapState({
    standupers: state => {
      const items = getItems(state, "standupers");
      return items;
    }
  }),
  data() {
    return {
      dialog: false,
      headers: [
        { text: "Slack ID", value: "user_id" },
        { text: "Channel ID", value: "channel_id" },
        { text: "Role in channel", value: "role_in_channel" },
        { text: "Submitted Standup", value: "submitted_standup_today" },
        { text: "Created", value: "created" }
        // { text: "Actions" }
      ],
      rows: [
        25,
        50,
        100,
        { text: "$vuetify.dataIterator.rowsPerPageAll", value: -1 }
      ]
    };
  },
  methods: {
    async delete(id) {
      return;
      const url = `v1/standupers/${id}`;
      this.$store.dispatch("REMOVE_STANDUPER", url);
    },
    edit(id) {
      this.$router.push({ name: "standuperEdit", params: { id: id } });
    }
  },
  beforeCreate() {
    const url = "v1/standupers";
    this.$store.dispatch("GET_STANDUPERS", url);
  }
};
</script>