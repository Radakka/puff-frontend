<template>
  <div v-if="gameLoaded" class="game">
    <Oponent v-for="oponent in game.oponents" :key="oponent.username" :username="oponent.username" :handSize="oponent.hand" :faceUp="oponent.faceUp" :faceDownSize="oponent.faceDown"></Oponent>
    <Table :deckSize="game.deckSize" :stackTop="stackTop" :stackSize="game.playedCards.length"/>
    <Player :username="game.player.username" :hand="game.player.hand" :faceUp="game.player.faceUp" :faceDownSize="game.player.faceDown"></Player>
  </div>
</template>

<script>
import Table from '@/components/Table.vue'
import Oponent from '@/components/Oponent.vue'
import Player from '@/components/Player.vue'
import gameplayService from '../_services/GameplayService'

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
          gameLoaded: false
      }
  },
  created: function() {
    gameplayService.getGame(this.gameId).then(game => {
      this.game = game;
      this.gameLoaded = true;
    });
  }
}
</script>

<style scoped lang="scss">
.game {
  margin: 0 auto;
  padding-top: 10px;
}
</style>
