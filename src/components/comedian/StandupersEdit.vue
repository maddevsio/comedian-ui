<template lang="html">
  <v-card class="mt-12 mx-auto" max-width="1200"> 
    <v-form  method="post">
      <v-container>
        <v-layout row justify-center>
            <v-select
              v-model="standuper.role_in_channel"
              :items="roles"
              label="Role in Channel"
              data-vv-name="select"
              required
            />  
        </v-layout>
      </v-container>
      <v-btn @click='Save'>
      Save
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
import transform from "../../helpers/transform";
import { mapState } from "vuex";

export default {
  computed: mapState({
    standuper: state => state.standuper.standupers
  }),

  data() {
    return {
      roles: ["Project Manager", "Designer", "Developer"]
    };
  },
  methods: {
    async Save() {
      const url = `v1/standupers/${this.$route.params.id}`;
      await this.$store.dispatch("UPDATE_STANDUPERS", {
        url,
        data: this.standuper.role_in_channel
      });
    }
  },
  beforeCreate() {
    const url = `v1/standupers/${this.$route.params.id}`;
    this.$store.dispatch("GET_STANDUPERS", url);
  }
};
</script>

