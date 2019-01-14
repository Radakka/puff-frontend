<template>
  <div class="oponent">
      <div class="username">{{username}}</div>
      <div class="hand">
          <Card faceDown="true">{{handSize}}</Card>
      </div>
      <div class="table">
          <Card v-for="card in tableCards" :card="card"></Card>
      </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'

export default {
  name: 'oponent',
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
  props: ['username', 'handSize', 'faceUp', 'faceDownSize']
}
</script>

<style scoped lang="scss">
  .oponent {
    border: 1px solid #333;
    width: fit-content;
    margin: 0 auto;
    margin-bottom: 30px;
    padding: 10px 15px;
    border-radius: 10px;
    background-color: #b3b300;

    .username {
      font-weight: bold;
      font-size: 20px;
      margin-bottom: 10px;
    }
  
    .hand {
      margin-bottom: 10px;
    }
  }
</style>