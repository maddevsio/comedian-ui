<template>
  <v-card class="mt-3 mx-auto" max-width="1200">
    <v-data-table :headers="headers" :items="standupers" class="elevation-1">
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.user_id }}</td>
        <td class="text-xs-left">{{ props.item.channel_id }}</td>
        <td class="text-xs-left">{{ props.item.role_in_channel }}</td>
        <td class="text-xs-left">{{ props.item.submitted_standup_today }}</td>
        <td class="text-xs-left">{{ props.item.created }}</td>
        <!-- <td class="text-xs-left">
          <router-link :to="{ name: 'standuperEdit', params: { id: props.item.id } }">
            <v-icon>edit</v-icon>
          </router-link>
          <v-icon @click="deleteStanduper(props.item.id)">delete</v-icon>
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
        // { text: "Options" }
      ]
    };
  },
  methods: {
    async deleteStanduper(id) {
      return;
      const url = `v1/standupers/${id}`;
      this.$store.dispatch("REMOVE_STANDUPER", url);
    }
  },
  beforeCreate() {
    const url = "v1/standupers";
    this.$store.dispatch("GET_STANDUPERS", url);
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