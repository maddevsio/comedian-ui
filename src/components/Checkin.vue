<template>   
 	<div class ="form-block">
    <h2>{{ title }}</h2>   
      <div class="imgLogo" v-for="item in items" :key="item.id">
        <img :src="item.img"/>         
      </div>
       <span class="mad_name">{{ madDevs }}</span> 
  			<div class="form-row"> 				
 				<input type="password" v-model="password" placeholder="password" /> 		
 		  </div> 	       
       <button class="btn">
         <a type="submit">{{ login }}</a></button>	  
      </div> 
</template>
<script>
export default {
  name: 'Checkin',
   data () {
    return {
      title:'Login with your password',
       madDevs: 'Mad Devs',
       login: 'login',
     items: [
        {
        img:require('../assets/logo/madLogo.png')
       }
     ] 
    }
 }
}
</script>
<style>
.form-block{
  font-family: 'Roboto', sans-serif; 
}

.imgLogo img {
  width: 103px;
  padding: 9px 0 9px 0;
}
.form-block input{
  width: 23%;
  height: 36px;
  border: 2px solid #ccc;
  padding: 0 3px;
  color: #444;    
  font-size: 14px;
  margin-top: 16px;
}

.mad_name {
  text-decoration: none;
  font-size: 32px;
  font-weight: 700;
  color: #333333;   
}

.btn {
  width: 16%;
  height: 46px;
  margin-top: 15px;
  border-radius: 4px;
  border: 2px solid #ccc;
}

a {
  text-decoration: none;
  font-size: 16px;
  color: #444;  
}
</style>