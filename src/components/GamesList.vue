<template>
  <div class="gamesList">
    <div v-for="game in games" v-if="!game.gameEnded" v-on:click="openGame(game.gameId)" class="game">
      <span class="turn" v-if="game.isUserTurn">Your turn</span> {{game.gameId}}
    </div>
  </div>
</template>

<script>
import gamesService from '../_services/GamesService'

export default {
  name: 'gamesList',
  data: function () {
    return {
      games: []
    }
  },
  created: function() {
    gamesService.getGames().then(games => {
      this.games = games;
    });
  },
  methods: {
    openGame: function(gameId) {
      alert("open game "+gameId);
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