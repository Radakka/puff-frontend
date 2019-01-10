<template>
  <div class="newGame">
    <form>
      <div v-if="error">
        <div v-for="message in errorMessages" class="error">{{message}}</div>
      </div>
      <input v-model="oponent" v-on:keyup.enter="submit" type="text" placeholder="Oponent username" />
      <div class="button">
        <a v-on:click="submit">Submit</a>
      </div>
    </form>
    <router-link to="/games"><< Back to games list</router-link>
  </div>
</template>

<script>
import gamesService from '../_services/GamesService'
import router from '../router'

export default {
  name: 'newGame',
  data: function () {
    return {
      oponent: '',
      error: false,
      errorMessages: []
    }
  },
  methods: {
    submit: function() {
      gamesService.newGame(this.oponent).then(
        game => {
          console.log(game);
          router.push('/games');
        },
        error => {
          this.error = true;
          this.errorMessages = error;
        }
      );
    }
  }
}
</script>

<style scoped lang="scss">
  .newGame {
    border: 1px solid #444444;
    border-radius: 5px;
    background-color: #F8F8F8;
    width: 90%;
    margin: 0 auto;
    padding: 30px;
    
    form {
      margin-bottom: 20px;
    }
    
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
        border-radius: 5px;
        padding: 10px 20px;
        width: 90%;
        color: #EEEEEE;
        cursor: pointer;
      }
    }
    
    .error {
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