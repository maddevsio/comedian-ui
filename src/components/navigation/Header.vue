<template>
   <div>
     <v-toolbar>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <router-link
      class="v-btn v-btn--flat theme--light"
      v-for="routes in links"
      v-bind:key="routes.id"
      :to="`${routes.page}`"
      flat
    >
      {{routes.text}}
    </router-link>
    </v-toolbar-items>
  </v-toolbar>
    <nav class="nav-bar">
      
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['title', 'links'],
}
</script>
<style>
.nav-bar {
  position: fixed;
  top: 0;
  left: 10px;
  display: flex;   

}
.nav-bar__link {
  color:black;
  text-decoration: none;
  padding: 10px 20px ;
  border:1px solid grey;  
}
.nav-bar__link:hover {
  color:#42b983;
  border-color:#42b983;
}  
</style>
