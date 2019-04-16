<template>
  <v-card class="mt-3 mx-auto" max-width="1200">
    <v-data-table
      :headers="headers"
      :items="users"
      class="elevation-1 text-uppercase font-weight-medium"
      :rows-per-page-items="this.rows"
    >
      <template v-slot:items="props">
        <td class="text-xs-left text-lowercase">{{ props.item.team_id }}</td>
        <td class="text-xs-left text-lowercase">{{ props.item.user_name }}</td>
        <td class="text-xs-left text-lowercase">{{ props.item.user_id }}</td>
        <td class="text-xs-left text-lowercase">{{ props.item.role }}</td>
        <td class="text-xs-left text-lowercase">{{ props.item.real_name }}</td>
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
        { text: "Team_id", value: "team_id" },
        { text: "User_name", value: "user_name" },
        { text: "User_id", value: "user_id" },
        { text: "Role", value: "role" },
        { text: "Real_name", value: "real_name" }
        // { text: "Actions"}
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
