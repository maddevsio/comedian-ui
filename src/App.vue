<template>
  <div id="app">
    <v-app>
      <router-view/>
      <ErrorComponent/>
    </v-app>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
<script>
import ErrorComponent from "./components/ErrorComponent.vue";
export default {
  components: {
    ErrorComponent
  }
};
</script>
