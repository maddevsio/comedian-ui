<template>
  <v-card class="mt-3 mx-auto" max-width="900">
    <v-data-table :headers="this.headers" :items="channels" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.team_id }}</td>
        <td class="text-xs-left">{{ props.item.channel_name }}</td>
        <td class="text-xs-left">{{ props.item.channel_id }}</td>
        <td class="text-xs-left">{{ props.item.channel_standup_time }}</td>
        <td class="text-xs-left">
          <router-link :to="{ name: 'edit', params: { id: props.item.id } }">
            <i class="material-icons option-btn">edit</i>
          </router-link>
          <i class="material-icons option-btn" @click="deleteChannel(props.item.id)">delete</i>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import transform from "../../helpers/transform";
import { mapState } from "vuex";

export default {
  computed: mapState({
    channels: state => state.channels.channels
  }),
  data() {
    return {
      dialog: false,
      title: "Channels",
      headers: [
        {
          text: "Channels",
          align: "center"
        },
        { text: "ID", value: "id" },
        { text: "Team_id", value: "team_id" },
        { text: "Channel_name", value: "channel_name" },
        { text: "Channel_id", value: "channel_id" },
        { text: "Channel_standup_time", value: "channel_standup_time" },
        { text: "Options", value: "" }
      ]
    };
  },
  beforeCreate() {
    const url = "channels";
    this.$store.dispatch("GET_CHANNELS", url);
  },
  methods: {
    deleteChannel(id) {
      const url = "channels/" + id;
      this.$store.dispatch("REMOVE_CHANNEL", url);
    }
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
</style>
