 <template>
  <v-card class="mt-3 mx-auto" max-width="1200">
    <v-data-table
      :headers="headers"
      :items="standups"
      class="elevation-1 text-uppercase font-weight-medium"
      :rows-per-page-items="this.rows"
    >
      <template v-slot:items="props">
        <td class="text-xs-left text-lowercase">{{ props.item.user_id }}</td>
        <td class="text-xs-left text-lowercase">{{ props.item.channel_id }}</td>
        <td class="text-xs-left text-lowercase">{{ props.item.created }}</td>
        <td class="text-xs-left text-lowercase">{{ props.item.modified}}</td>
        <td class="text-xs-left text-lowercase">{{ props.item.comment }}</td>
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
    standups: state => {
      const items = getItems(state, "standups");
      return items;
    }
  }),

  data() {
    return {
      headers: [
        { text: "User ID", value: "user_id" },
        { text: "Channel ID", value: "channel_id" },
        { text: "Created", value: "created" },
        { text: "Modified", value: "modified" },
        { text: "Text", value: "comment" }
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
    delete(id) {
      return;
      const url = `v1/standups/${id}`;
      this.$store.dispatch("REMOVE_STANDUP", url);
    },
    edit(id) {
      this.$router.push({ name: "standupEdit", params: { id: id } });
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
.isDisabled {
  pointer-events: none;
  cursor: not-allowed;
}
</style>