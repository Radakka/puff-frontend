<template>
  <div class="home">
    <h1>Your games</h1>
    <GamesList />
  </div>
</template>

<script>
// @ is an alias to /src
import GamesList from '@/components/GamesList.vue'

export default {
  name: 'home',
  components: {
    GamesList
  }
}
</script>

<style scoped lang="scss">
.home {
  margin: 0 auto;
}
</style>
