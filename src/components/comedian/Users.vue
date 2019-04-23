<template>
  <v-card class="mt-3 mx-auto" max-width="1200">
    <v-data-table
      :headers="headers"
      :items="users"
      class="elevation-1 font-weight-medium"
      :rows-per-page-items="this.rows"
    >
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.real_name }}</td>
        <td class="text-xs-left">{{ props.item.user_name }}</td>
        <td class="text-xs-left">{{ props.item.user_id }}</td>
        <td class="text-xs-left">{{ props.item.role }}</td>
        <!-- <td class="text-xs-left">
          <v-icon small class="mr-2" @click="edit(props.item.id)">edit</v-icon>
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
    users: state => {
      const items = getItems(state, "users");
      return items;
    }
  }),
  data() {
    return {
      headers: [
        {
          text: "Real Name",
          value: "real_name",
          class: "text-uppercase font-weight-bold"
        },
        {
          text: "User Name",
          value: "user_name",
          class: "text-uppercase font-weight-bold"
        },
        {
          text: "User Id",
          value: "user_id",
          class: "text-uppercase font-weight-bold"
        },
        {
          text: "Role",
          value: "role",
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
  created() {
    const url = "v1/users";
    this.$store.dispatch("GET_USERS", url);
  }
};
</script>
