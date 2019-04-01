<template lang="html">
<v-card class="mt-12 mx-auto" max-width="1200"> 
  <v-form  method="post">
    <v-container>
       <v-layout row justify-center>
        <v-text-field
            v-model="user.role"
            label="User Role"
            required
          />     
      </v-layout>
    </v-container>
    <v-btn @click='Save'
    >
     Save
    </v-btn>
  </v-form>
</v-card> 
</template>
<script>
import { mapState } from "vuex";

export default {
  computed: mapState({
    user: state => state.users.users
  }),
  beforeCreate() {
    const url = `v1/users/${this.$route.params.id}`;
    this.$store.dispatch("GET_USERS", url);
  },
  methods: {
    async Save() {
      const url = `v1/users/${this.$route.params.id}`;
      await this.$store.dispatch("UPDATE_CHANNEL", {
        url,
        data: this.user.role
      });
    }
  }
};
</script>
