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
        <td class="text-xs-left comment">
          <p
            :class="['comment__text', { 'comment__text--full': textToggle }]"
          >{{ props.item.comment }}</p>
          <span class="text__show" @click="toggleText()">Show all standup text</span>
        </td>
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
      items.map(item => {
        item.created = item.created.toDateString();
        item.modified = item.modified.toDateString();
      });
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
      ],
      textToggle: false
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
    },
    toggleText() {
      this.textToggle = !this.textToggle;
      if (this.textToggle == true) {
        document.getElementsByClassName("text__show")[0].innerHTML = "HideText";
      } else {
        document.getElementsByClassName("text__show")[0].innerHTML =
          "Show all standup text";
      }
    }
  },
  beforeCreate() {
    const url = "v1/standups";
    this.$store.dispatch("GET_STANDUPS", url);
  }
};
</script>    

<style lang="scss" scoped>
.comment {
  &__text {
    overflow: hidden;
    position: relative;
    line-height: 1.2em;
    max-height: 3.6em;
    text-align: justify;
    margin-right: -1em;
    padding-right: 1em;
    &:before {
      content: "...";
      position: absolute;
      right: 0;
      bottom: 0;
    }
    &:after {
      content: "";
      position: absolute;
      right: 0;
      width: 1em;
      height: 1em;
      margin-top: 0.2em;
    }
    &--full {
      max-width: none;
    }
  }
}
.text__show {
  font-weight: bold;
  cursor: pointer;
}
</style>