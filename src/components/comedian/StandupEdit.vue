<template lang="html">
    <v-container>
        <v-card class="mt-3">
            <v-card-text>
            <v-text-field
                v-model="standup.comment"
                label="Comment"
                required
            />  
            </v-card-text>

            <v-btn @click='Save'>
            Save
            </v-btn>
        </v-card>
    </v-container>
</template>
<script>
import transform from "../../helpers/transform";
import { mapState } from "vuex";

export default {
  computed: mapState({
    standup: state => state.standups.standups
  }),

  methods: {
    async Save() {
      const url = `v1/standups/${this.$route.params.id}`;
      await this.$store
        .dispatch("UPDATE_STANDUPS", {
          url,
          data: {
            comment: this.standup.comment
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
    const url = `v1/standups/${this.$route.params.id}`;
    this.$store.dispatch("GET_STANDUPS", url);
  }
};
</script>

