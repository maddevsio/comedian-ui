<template> 
  <div class ="block">
 	<div class ="form-block">
         <h3>{{ title }}</h3>
 		<form action="">
 			<div class="form-row field">
 				<label for="id">{{ login }}</label> 				
 				<input type="text" id="username" placeholder="Oli Moli">
 			</div>
 			<div class="form-row field">
 				<label for="id">{{ password }}</label>
 				<input type="password" v-model="name" placeholder="password" />
 			</div>
 			<div class="form-row field">
            <label for="id">{{ email }}</label>
 				<input type="email" id="email" placeholder="oliver67@gmail.com">
 			</div>  			
  			<div class="form-row">
              <p>{{ gender }}</p>
              <input type="radio" id="women" name="gender">
              <label for="women">{{ women }}</label>
              <input type="radio" id="men" name="gender">
              <label for="women">{{ men }}</label>  								
  			</div>             
            <div class="form-row">
              <label for="">{{ language }}</label>
               <select>
                 <option value="1">Deutsch</option>
                 <option value="2">English</option>
	             <option value="3">Русский</option>
	          </select>
             </div>               
             <button><a href="https://codecombat.com/play/level/the-raised-sword?">{{ send }}</a></button>
 	</form>
  </div>
</div>  
</template>
<script>
export default {
  name: 'Checkin',
   data () {
    return {
      title:'ЗАРЕГИСТРИРУЙСЯ И ИГРАЙ!' ,
      login:'Логин(Ник)', 
      password: 'Ваш пароль',
      email: 'Ваш E-Mail',
      gender:'Укажите ваш пол',
      women: 'Женский',
      men: 'Мужской',
      language:'Язык интерфейса',
      send:'Send'
    }
 }
}
</script>

<style>
.block{
  width:  300px;
  margin: 0 auto;
  padding: 30px 0;
}
.form-block{
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-row{
  padding: 0 0 10px;
}
.form-block input{
  width: 100%;
  height: 28px;
  border: 1px solid #ccc;
  padding: 0 3px;
  color: #444;
  font-style: italic;
  font-size: 14px;
}

.form-row span{
  display: block;
  margin: 0 0 5px;
}
.form-row input[type=
  "checkbox"]{
  display: none;
}
.form-row input[type=
  "checkbox"]+ label::before{
  content: " ";
  display: inline-block;
  width: 20px;
  height: 20px;
}

.form-row select{
  width: 100%;
  height: 28px;
  border: 1px solid #ccc;
  padding: 0 3px;
  color: #444;
  font-style: italic;
  font-size: 14px;
} 

a {
  text-decoration: none;
}
</style>