<template>
  <div class="home">
    <Game :gameId="$route.params.gameId"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Game from '../components/Game.vue'

export default {
  name: 'game',
  components: {
    Game
  }
}
</script>

<style scoped lang="scss">
.home {
  margin: 0 auto;
}
</style>
