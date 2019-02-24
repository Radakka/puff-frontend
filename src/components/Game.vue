<template>
  <div v-if="gameLoaded" class="game">
    <Oponent v-for="oponent in game.oponents" :key="oponent.username" :username="oponent.username" :handSize="oponent.hand" :faceUp="oponent.faceUp" :faceDownSize="oponent.faceDown" :turn="checkTurn(oponent.username)"></Oponent>
    <Table :deckSize="game.deckSize" :stackTop="stackTop" :stackSize="game.playedCards.length"/>
    <Player @play-cards="playCards" :username="game.player.username" :hand="game.player.hand" :faceUp="game.player.faceUp" :faceDownSize="game.player.faceDown" :turn="checkTurn(game.player.username)"></Player>
  </div>
</template>

<script>
import Table from '../components/Table.vue'
import Oponent from '../components/Oponent.vue'
import Player from '../components/Player.vue'
import gameplayService from '../_services/GameplayService'
import eventsService from '../_services/EventsService'

export default {
  name: 'game',
  components: {
    Table,
    Oponent,
    Player
  },
  props: ['gameId'],
  computed: {
      stackTop: function () {
          if(this.game.playedCards.length > 0) {
              return this.game.playedCards[this.game.playedCards.length - 1];
          }
          return null;
      }
  },
  data: function() {
      return {
          game: {},
          gameLoaded: false,
          eventsSource: null
      }
  },
  created: function() {
    gameplayService.getGame(this.gameId).then(game => {
      this.game = game;
      this.gameLoaded = true;
      this.eventsSource = this.setupEventsListener();
    });
  },
  destroyed: function() {
      this.eventsSource.close();
  },
  methods: {
      playCards: function(source, positions) {
          gameplayService.playCard(this.gameId, source, positions, this.game.oponents[0].username).then(game => {
              this.game = game;
          });
      },
      setupEventsListener: function() {
        let _this = this;
        return eventsService.setupEventsListener(this.gameId, game => {
          _this.game = game;
        },
        error => {
          console.log(error);
          _this.eventsSource.close();
          _this.eventsSource = _this.setupEventsListener();
        });
      },
      checkTurn: function(username) {
          return username === this.game.currentTurn;
      }
  }
}
</script>

<style scoped lang="scss">
.game {
  margin: 0 auto;
  padding-top: 10px;
}
</style>
