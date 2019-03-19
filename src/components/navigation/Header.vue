<template>
   <div>
    <nav class="nav-bar">
      <router-link v-for="routes in links" 
      v-bind:key="routes.id"
      :to="`${routes.page}`"
      class="nav-bar__link">{{routes.text}}</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      links: [
        {
          id: 0,
          text: 'Comedian',
          page:'/#'
        },
        {
          id: 1,
          text: 'Collector',
          page:'/#'
        },
        {
          id: 2,
          text: 'Reporter',
          page:'/#'
        },
        {
          id: 3,
          text: 'Sprint Reporter',
          page:'/#'
        },
        {
          id: 4,
          text: 'On Duty Service',
          page:'/#'
        },
        {
          id: 5,
          text: 'Other Service',
          page:'/#'
        }        
      ]
    }
  }
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
