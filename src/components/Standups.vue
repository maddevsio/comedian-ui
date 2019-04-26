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
          <span class="primary--text text__show" @click="toggleText()">Show full standup text</span>
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
        let created = new Date(item.created);
        let modified = new Date(item.modified);
        item.created = created.toUTCString();
        item.modified = modified.toUTCString();
      });
      const allUsers = getItems(state, "users");
      const channels = getItems(state, "channels");

      items.forEach(item => {
        if (!item.user_id) {
          item.user_id = "N/A";
        } else {
          const user = allUsers.find(({ user_id }) => item.user_id === user_id);
          if (!user) {
            item.user_id = "N/A";
          } else {
            item.user_id = user.real_name;
          }
        }
      });
      items.forEach(item => {
        if (!item.channel_id) {
          item.channel_id = "N/A";
        } else {
          const channel = channels.find(
            ({ channel_id }) => item.channel_id === channel_id
          );
          if (!channel) {
            item.channel_id = "N/A";
          } else {
            item.channel_id = channel.channel_name;
          }
        }
      });
      return items;
    }
  }),

  data() {
    return {
      headers: [
        {
          text: "User",
          value: "user_id",
          class: "text-uppercase font-weight-bold"
        },
        {
          text: "Channel",
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
    const urlChannels = "v1/channels";
    this.$store.dispatch("GET_CHANNELS", urlChannels);
    const urlUsers = "v1/users";
    this.$store.dispatch("GET_USERS", urlUsers);
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
  }
}
.comment__text--full {
  max-height: none;
}
.text__show {
  font-weight: bold;
  cursor: pointer;
}
</style>