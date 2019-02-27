<template>
  <div class="register">
    <form>
      <div v-if="error" class="registerError">{{errorMessage}}</div>
      <input v-model="username" v-on:keyup.enter="submit" type="text" class="user" placeholder="username" />
      <input v-model="password" v-on:keyup.enter="submit" type="password" class="password" placeholder="password" />
      <input v-model="password2" v-on:keyup.enter="submit" type="password" class="password" placeholder="confirm password" />
      <div class="button back">
        <router-link to="/">Back</router-link>
      </div>
      <div class="button">
        <a v-on:click="submit">Submit</a>
      </div>
    </form>
  </div>
</template>

<script>
import userService from '../_services/UserService';
import router from '../router'

export default {
  name: 'register',
  data: function () {
    return {
      username: '',
      password: '',
      password2: '',
      error: false,
      errorMessage: ''
    }
  },
  methods: {
    submit: function () {
      if(this.validate().valid) {
        userService.register(this.username, this.password).then(
          user => {
            userService.login(this.username, this.password).then(
              user => {
                router.push('/games');
              }
            );
          },
          error => {
            console.log(error);
            this.error = true;
            this.errorMessage = error;
          }
        );
      } else {
        this.error = true;
        this.errorMessage = this.validate().message
      }
    },
    validate: function () {
    
      if(this.username.length === 0) {
        return {
          valid: false,
          message: 'Username must not be empty'
        }
      }
    
      if(this.password.length === 0) {
        return {
          valid: false,
          message: 'Password must not be empty'
        }
      }
    
      if(this.password !== this.password2) {
        return {
          valid: false,
          message: 'Passwords must match each other'
        }
      }
    
      return { valid: true }	
    }
  }
}
</script>

<style scoped lang="scss">
  .register {
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
      
      &.back a {
      	background-color: #777;
      }
    }
    
    .registerError {
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