<template>
  <v-card class="mt-3 mx-auto" max-width="1200">
    <v-data-table :headers="headers" :items="users" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.team_id }}</td>
        <td class="text-xs-left">{{ props.item.user_name }}</td>
        <td class="text-xs-left">{{ props.item.user_id }}</td>
        <td class="text-xs-left">{{ props.item.role }}</td>
        <td class="text-xs-left">{{ props.item.real_name }}</td>
        <td class="text-xs-left">
          <router-link
            class="isDisabled"
            :to="{ name:'users_edit', params: { id: props.item.id } }"
          >
            <i class="material-icons option-btn">edit</i>
          </router-link>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>
  
<script>
import { mapState } from "vuex";
export default {
  computed: mapState({
    users: state => state.users.users
  }),
  data() {
    return {
      headers: [
        {
          dialog: false,
          text: "Users",
          align: "center"
        },
        { text: "ID", value: "id" },
        { text: "Team_id", value: "team_id" },
        { text: "User_name", value: "user_name" },
        { text: "User_id", value: "user_id" },
        { text: "Role", value: "role" },
        { text: "Real_name", value: "real_name" },
        { text: "Options", value: "" }
      ]
    };
  },
  beforeCreate() {
    const url = "v1/users";
    this.$store.dispatch("GET_USERS", url);
  }
};
</script>
<style lang="scss" scoped>
.option-btn {
  color: grey;
  font-size: 18px;
  &:hover {
    color: #42b983;
    cursor: pointer;
  }
}
.isDisabled {
  pointer-events: none;
  cursor: not-allowed;
}
</style>