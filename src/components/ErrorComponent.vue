<template>
  <ul v-if="this.messages.length > 0">
    <li v-for="message in this.messages" :key="message">
      <v-alert :color="message.type">{{message.text}}</v-alert>
    </li>
  </ul>
</template>
<script>
import { mapState } from "vuex";

export default {
  computed: mapState({
    messages: state => state.errors
  })
};
</script>
