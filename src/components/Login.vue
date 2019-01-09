<template>
  <div class="login">
    <form>
      <input type="text" class="user" placeholder="username"></input>
      <input type="password" class="password" placeholder="password"></input>
      <div class="button">
      	<a href="#">Submit</a>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'login',
}
</script>

<style scoped lang="scss">
  .login {
  	border: 1px solid #444444;
  	border-radius: 5px;
  	background-color: #F8F8F8;
  	width: 80%;
  	margin: 0 auto;
  	padding: 10px;
  
    input {
      width: 90%;
      margin: 10px;
      padding: 10px;
      border-radius: 5px;
    }
    
    .button {
    	margin: 10px;
    	
    	a {
    	  background-color: #009933;
    	  padding: 10px;
    	  width: 90%;
        color: #EEEEEE;
        text-decoration: none;
    	}
    }
  }
</style>