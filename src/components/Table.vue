<template>
  <div class="gameTable">
      <Card suit="faceDown" number="0">{{deckSize}}</Card>
      <Card v-if="stackTop" :suit="stackTop.suit" :number="stackTop.number">{{stackSize}}</Card>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'

export default {
  name: 'gameTable',
  components: {
      Card
  },
  data: function () {
    return {
    }
  },
  props: ['deckSize', 'stackTop', 'stackSize'],
  methods: {
  }
}
</script>

<style scoped lang="scss">
  .gameTable {
      margin-bottom: 40px;
  }
</style>