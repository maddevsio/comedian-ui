<template>
<div class= "team">
  <h2 class="teamPage">{{ title }}</h2> 
  <div class="container">
   <div class="imgLogo" v-for="item in items" :key="item.id">
     <img :src="item.img"/>
   </div>
<<<<<<< HEAD
      <span class="madDevs">{{ madDevs }}</span>   
      <span class="goDee">{{ goDee }}</span>   
      <span class="anotherSlack">{{ slackTeam}}</span>   
      <span class="Nappy">{{ nappy }}</span>   
      <span class="Choko">{{ choko }}</span>   
      <span class="yetAnother">{{ anotherTeam }}</span>   
=======
   <span class= "projectsName">{{ projectsName }}</span>   
>>>>>>> 40a3f0ff072016182c97201eb1778012a721a52b
   </div>
  </div>
</template>

<script>
export default {
  name: 'Team',
  data() {
    return {
<<<<<<< HEAD
        title: 'Choose your Comedian to enter/login',
        madDevs: 'Mad Devs',
        goDee: 'Go Dee',
        slackTeam: 'Another Slack Team',
        nappy: 'Nappy',
        choko:'Choko',
        anotherTeam:'Yet Another Slack Team',
     items: [
       {
        img:require('../assets/logo/madLogo.png')
       },
       {
        img:require('../assets/logo/choco.png')
       },
       {
        img:require('../assets/logo/images.png')
        },
        {
        img:require('../assets/logo/nappy.png')
        },
        {
        img:require('../assets/logo/choco.png')
        },
        {
        img:require('../assets/logo/madLogo.png')        
=======
    title: 'Choose your Comedian to enter/login',
    projectsName: 'Mad Devs',
     items: [
       {
        img:require('../assets/logo/madLogo.png')
>>>>>>> 40a3f0ff072016182c97201eb1778012a721a52b
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
