 <template>
  <v-card class="mt-3 mx-auto" max-width="1200">
    <v-data-table :headers="headers" :items="standups" class="elevation-1">
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.user_id }}</td>
        <td class="text-xs-left">{{ props.item.channel_id }}</td>
        <td class="text-xs-left">{{ props.item.created }}</td>
        <td class="text-xs-left">{{ props.item.modified}}</td>
        <td class="text-xs-left">{{ props.item.comment }}</td>
        <td class="text-xs-left">
          <router-link :to="{ name: 'standupEdit', params: { id: props.item.id } }">
            <i class="material-icons option-btn">edit</i>
          </router-link>
          <i class="material-icons option-btn" @click="deleteStandup(props.item.id)">delete</i>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>		  

<script>
import { mapState } from "vuex";
export default {
  computed: mapState({
    standups: state => state.standups.standups
  }),

  data() {
    return {
      headers: [
        { text: "ID", value: "id" },
        { text: "User ID", value: "user_id" },
        { text: "Channel ID", value: "channel_id" },
        { text: "Created", value: "created" },
        { text: "Modified", value: "modified" },
        { text: "Text", value: "comment" },
        { text: "Options" }
      ]
    };
  },

  methods: {
    deleteStandup(id) {
      const url = `v1/standups/${id}`;
      this.$store.dispatch("REMOVE_STANDUP", url);
    }
  },
  beforeCreate() {
    const url = "v1/standups";
    this.$store.dispatch("GET_STANDUPS", url);
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