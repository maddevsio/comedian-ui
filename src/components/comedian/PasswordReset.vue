<template lang="html">
  <v-card class="mt-3 mx-auto" max-width="900">
    <v-form method="post">
      <v-container>
        <v-layout>
          <v-flex xs12 md6>
            <v-text-field
              v-model="oldPassword"
              label="Old Password"
              :append-icon="show1 ? 'visibility' : 'visibility_off'"
              :rules="[rules.required]"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
            />
          </v-flex>
          <v-flex xs12 md6>
            <v-text-field
              v-model="newPassword"
              label="New Password"
              :append-icon="show2 ? 'visibility' : 'visibility_off'"
              :rules="[rules.required]"
              :type="show2 ? 'text' : 'password'"
              class="input-group--focused"
              counter
              @click:append="show2 = !show2"
            />
          </v-flex>
        </v-layout>
        <v-btn color="primary white--text" @click='Save'>Save</v-btn>
      </v-container>   
    </v-form>
    <v-card>
    </v-card>
  </v-card>
</template>

<script>
import transform from "../../helpers/transform";
import store from "../../store";

export default {
  data() {
    return {
      show1: false,
      show2: false,
      oldPassword: "",
      newPassword: "",
      rules: {
        required: value => !!value || "Required."
      }
    };
  },
  methods: {
    async Save() {
      const botId = store.state.user.bot.id;
      const url = `v1/bots/${botId}/update-password`;
      await this.$store
        .dispatch("UPDATE_PASSWORD", {
          url,
          data: {
            old_password: this.oldPassword,
            new_password: this.newPassword
          }
        })
        .then(() => {
          this.flashMessage.success({
            title: "",
            message: "Successfully saved"
          });
        })
        .catch(error => {
          this.flashMessage.error({
            title: error.name || "Error",
            message: error.response.data
          });
        });
    }
  },
  beforeCreate() {
    const botId = this.$store.state.user.bot.id;
    const url = `v1/bots/${botId}`;
    this.$store.dispatch("GET_BOT", url);
  }
};
</script>
