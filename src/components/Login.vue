<template>
  <div class="login">
    <form>
      <div v-if="loginFailed" class="loginError">Username or password are not correct</div>
      <input v-model="username" v-on:keyup.enter="submit" type="text" class="user" placeholder="username" />
      <input v-model="password" v-on:keyup.enter="submit" type="password" class="password" placeholder="password" />
      <div class="button">
        <a v-on:click="submit">Login</a>
      </div>
      <div class="button register">
        <router-link to="/register">Register</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import userService from '../_services/UserService';
import router from '../router'

export default {
  name: 'login',
  data: function () {
    return {
      username: '',
      password: '',
      loginFailed: false
    }
  },
  methods: {
    submit: function () {
      userService.login(this.username, this.password).then(
        user => {
          router.push('/games');
        },
        error => {
          this.loginFailed = true;
        }
      );
    }
  }
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
      display: inline-block;
        
      a {
        background-color: #009933;
        border-radius: 5px;
        padding: 10px 20px;
        width: 90%;
        color: #EEEEEE;
        cursor: pointer;
        text-decoration: none;
      }
      
      &.register a {
      	background-color: #777;
      }
    }
    
    .loginError {
      border: 1px solid #b30000;
      border-radius: 5px;
      padding: 10px;
      width: 90%;
      margin: 0 auto;
      background-color: #e60000;
      font-weight: bold;
      color: white;
    }
  }
</style>