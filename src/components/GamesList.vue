<template>
  <div class="gamesList">
    <div v-for="game in activeGames" :key="game.gameId" v-on:click="openGame(game.gameId)" class="game">
      <span class="turn" v-if="game.isUserTurn">Your turn</span> {{game.gameId}}
    </div>
    <div class="newGame" v-on:click="newGame">
      + New Game
    </div>
  </div>
</template>

<script>
import gamesService from '../_services/GamesService'
import router from '../router'

export default {
  name: 'gamesList',
  data: function () {
    return {
      games: []
    }
  },
  computed: {
    activeGames: function() {
      return this.games.filter((game) => {
        return !game.gameEnded;
      });
    }
  },
  created: function() {
    gamesService.getGames().then(
      games => {
        this.games = games;
      });
  },
  methods: {
    openGame: function(gameId) {
      router.push("/game/"+gameId);
    },
    newGame: function() {
      router.push("/game/new");
    }
  }
}
</script>

<style scoped lang="scss">
  .gamesList {
    border: 1px solid #444444;
    border-radius: 5px;
    background-color: #F8F8F8;
    width: 90%;
    margin: 0 auto;
    padding: 30px;
    
    .newGame {
      text-align: left;
      border-bottom: 1px solid;
      padding: 15px;
      cursor: pointer;
      color: #336600;
      font-weight: bold;
      background-color: #b3ffb3;
      
      &:hover {
        background-color: #336600;
        color: #FFF;
      }
    }
    
    .game {
      text-align: left;
      border-bottom: 1px solid;
      padding: 15px;
      cursor: pointer;
      
      &:first-child {
        border-top: 1px solid;
      }
      
      &:nth-child(even) {
        background-color: #CCCCCC;
      }
      
      &:hover {
        background-color: #d9ff66;
      }
      
      .turn {
        font-weight: bold;
      }
    }
  }
</style>