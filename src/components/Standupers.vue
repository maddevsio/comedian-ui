<template>
  <v-card class="mt-3 mx-auto" max-width="1200">
    <v-data-table
      :headers="headers"
      :items="standupers"
      class="elevation-1 font-weight-medium"
      :rows-per-page-items="this.rows"
    >
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.real_name }}</td>
        <td class="text-xs-left">{{ props.item.channel_name }}</td>
        <td class="text-xs-left">{{ props.item.role_in_channel }}</td>
        <td class="text-xs-left">{{ props.item.submitted_standup_today }}</td>
        <td class="text-xs-left">{{ props.item.created }}</td>
        <!-- <td class="text-xs-left">
          <v-icon small class="mr-2" @click="edit(props.item.id)">edit</v-icon>
          <v-icon small @click="deleteItem(props.item.id)">delete</v-icon>
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
        {
          text: "Real Name",
          value: "real_name",
          class: "text-uppercase font-weight-bold"
        },
        {
          text: "Channel",
          value: "channel_name",
          class: "text-uppercase font-weight-bold"
        },
        {
          text: "Role in channel",
          value: "role_in_channel",
          class: "text-uppercase font-weight-bold"
        },
        {
          text: "Submitted Standup",
          value: "submitted_standup_today",
          class: "text-uppercase font-weight-bold"
        },
        {
          text: "Created",
          value: "created",
          class: "text-uppercase font-weight-bold"
        }
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
    async deleteItem(id) {
      const url = `v1/standupers/${id}`;
      this.$store
        .dispatch("REMOVE_STANDUPER", { url, id: id })
        .then(() => {
          this.flashMessage.success({
            title: "",
            message: "Task successfully deleted"
          });
        })
        .catch(error => {
          this.flashMessage.error({
            title: error.name || "Error",
            message: error.response.data
          });
        });
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