<template>
  <div class="login">
    <form>
      <input v-model="username" type="text" class="user" placeholder="username" />
      <input v-model="password" type="password" class="password" placeholder="password" />
      <div class="button">
        <a v-on:click="submit">Submit</a>
      </div>
    </form>
  </div>
</template>

<script>
import userService from '../_services/UserService';

export default {
  name: 'login',
  data: function () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    submit: function () {
      userService.login(this.username, this.password)
    },
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
        
        a {
          background-color: #009933;
          padding: 10px;
          width: 90%;
          color: #EEEEEE;
          cursor: pointer;
        }
    }
  }
</style>