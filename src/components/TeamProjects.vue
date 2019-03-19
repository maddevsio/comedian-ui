<template>
<div class= "team">
  <h2 class="teamPage">{{ title }}</h2> 
  <div class="container">
   <div class="imgLogo" v-for="item in items" :key="item.id">
     <img :src="item.img"/>
   </div>
   <span class= "projectsName">{{ projectsName }}</span>   
   </div>
  </div>
</template>

<script>
export default {
  name: 'Team',
  data() {
    return {
    title: 'Choose your Comedian to enter/login',
    projectsName: 'Mad Devs',
     items: [
       {
        img:require('../assets/logo/madLogo.png')
       }
     ]
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto');
.team {
  font-family: 'Roboto', sans-serif;
}

.title {
  color: #333333;
  font-size: 24px;
  font-weight: 500;
  text-align: center; 
}

.container {
  display: flex;
  flex-wrap: wrap;
}

.imgLogo {
  width: 200px;
  height: 200px;
}

</style>
