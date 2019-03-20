<template>
<div class= "team">
  <h2 class="teamPage">{{ title }}</h2> 
  <div class="team_container">
    <div>
      <span class="team_name"><a href="#">{{ madDevs }}</a></span> 
       <div class="imgLogo" v-for="item in items" :key="item.id">
         <img :src="item.img"/>
    </div>        
    </div>
    <div>
      <span class="team_name"><a href="#">{{ goDee }}</a></span> 
       <div class="imgLogo" v-for="icon in icons" :key="icon.id">
         <img :src="icon.img"/>
      </div>
      </div>
    <div>
       <span class="team_name"><a href="#">{{ slackTeam}}</a></span>
       <div class="imgLogo" v-for="img in imgs" :key="img.id">
         <img :src="img.img"/>
      </div>
      </div>
    <div>
      <span class="team_name"><a href="#">{{ nappy }}</a></span>  
       <div class="imgLogo" v-for="link in links" :key="link.id">
         <img :src="link.img"/>
      </div>         
    </div>
    <div>
      <span class="team_name"><a href="#">{{ choko }}</a></span>  
    <div class="imgLogo" v-for="choko in chokos" :key="choko.id">
      <img :src="choko.img"/>
     </div>       
    </div>
    <div>
      <span class="team_name"><a href="#">{{ anotherTeam }}</a></span>  
     <div class="imgLogo" v-for="photo in photos" :key="photo.id">
       <img :src="photo.img"/>
    </div>        
     </div>        
   </div>
  </div>
</template>

<script>
export default {
  name: 'Team',
  data() {
    return {
        title: 'Choose your Comedian to enter/login',
        madDevs: 'Mad Devs',
        goDee: 'GoDee',
        slackTeam: 'Another Slack Team',
        nappy: 'Nappy',
        choko:'Choko',
        anotherTeam:'Yet Another Slack Team',
     items: [
       {
        img:require('../assets/logo/madLogo.png')
       }
     ],
     icons:[
      {
        img:require('../assets/logo/choco.png')
      }
     ],
     imgs: [
       {
        img:require('../assets/logo/images.png')
        }
     ],
     links:[
        {
        img:require('../assets/logo/nappy.png')
        }
     ],
     chokos: [
        {
        img:require('../assets/logo/choco.png')
        },
     ],
     photos: [
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

.teamPage {
  color: #333333;
  font-size: 24px;
  font-weight: 600;  
  padding: 10px 58px 17px 0;
  margin: 6px 58px 24px 0;
}

.team_container {  
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 15px;  
}

.imgLogo {
  width: 550px;
  height: 110px;
  padding-bottom: 18px;
}

img {
  width: 86px;
}

.team_name a {
  text-decoration: none;
  font-weight: 700;
  color: #333333;   
}

.team_name {
  position: absolute;
  margin: 22px 46px;
  padding: 9px 28px;
 }
</style>
