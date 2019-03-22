<template>
   <div>
    <nav class="sidenav">
      <router-link v-for="routes in links" 
      v-bind:key="routes.id"
      :to="`${routes.page}`"
      class="sidenav__link">{{routes.text}}</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Sidenav',
  data() {
    return {
      links: [
        {
          id: 0,
          text: 'Settings',
          page:'/comedian'
        },
        {
          id: 1,
          text: 'Channels',
          page:'/channels'
        },
        {
          id: 2,
          text: 'Standupers',
          page:'/standupers'
        },
        {
          id: 3,
          text: 'StandUp',
          page:'/#'
        },
        {
          id: 4,
          text: 'Users',
          page:'/users'
        }           
      ]
    }
  }
}
</script>
<style>
.sidenav {
  position: fixed;
  flex-direction: column;
  top: 20%;
  left: 0;
  display: flex;   

}
.sidenav__link {
  color:black;
  text-decoration: none;
  padding: 10px 20px ;
  border:1px solid grey;  
}
.sidenav__link:hover {
  color:#42b983;
  border-color:#42b983;
}  
</style>

