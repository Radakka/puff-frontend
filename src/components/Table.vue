<template>
  <div class="gameTable">
      <Card faceDown="true">{{deckSize}}</Card>
      <Card v-if="stackTop" :card="stackTop">{{stackSize}}</Card>
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