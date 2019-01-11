<template>
  <div class="player">
      <div class="username">{{username}}</div>
      <div class="hand">
          <Card v-for="card in hand" :suit="card.suit" :number="card.number"></Card>
      </div>
      <div class="table">
          <Card v-for="card in tableCards" :suit="card.suit" :number="card.number"></Card>
      </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'

export default {
  name: 'player',
  components: {
      Card
  },
  computed: {
      tableCards: function () {
          let tableCards = this.faceUp.slice();
          while(tableCards.length < this.faceDownSize) {
            tableCards.push({suit: "faceDown", number: 0});
          }
          return tableCards;
      }
  },
  data: function () {
    return {
    }
  },
  props: ['username', 'hand', 'faceUp', 'faceDownSize']
}
</script>

<style scoped lang="scss">
  .player {
    border: 1px solid #333;
    width: fit-content;
    margin: 0 auto;
    margin-bottom: 30px;
    padding: 5px 15px;
    border-radius: 5px;
    background-color: #EEE;

    .username {
      font-weight: bold;
    }
  
    .hand {
      margin-bottom: 10px;
    }
  }
</style>