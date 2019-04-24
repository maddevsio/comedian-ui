 <template>
  <v-card class="mt-3 mx-auto" max-width="1200">
    <v-data-table
      :headers="headers"
      :items="standups"
      class="elevation-1 font-weight-medium"
      :rows-per-page-items="this.rows"
    >
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.user_id }}</td>
        <td class="text-xs-left">{{ props.item.channel_id }}</td>
        <td class="text-xs-left">{{ props.item.created }}</td>
        <td class="text-xs-left">{{ props.item.modified}}</td>
        <td class="text-xs-left">{{ props.item.comment }}</td>
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
    standups: state => {
      const items = getItems(state, "standups");
      return items;
    }
  }),

  data() {
    return {
      headers: [
        {
          text: "User ID",
          value: "user_id",
          class: "text-uppercase font-weight-bold"
        },
        {
          text: "Channel ID",
          value: "channel_id",
          class: "text-uppercase font-weight-bold"
        },
        {
          text: "Created",
          value: "created",
          class: "text-uppercase font-weight-bold"
        },
        {
          text: "Modified",
          value: "modified",
          class: "text-uppercase font-weight-bold"
        },
        {
          text: "Text",
          value: "comment",
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
    deleteItem(id) {
      return;
      const url = `v1/standups/${id}`;
      this.$store
        .dispatch("REMOVE_STANDUP", { url, id: id })
        .then(response => {
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