<template>
  <div class="home">
    <h1>New game</h1>
    <NewGame />
  </div>
</template>

<script>
// @ is an alias to /src
import NewGame from '../components/NewGame.vue'

export default {
  name: 'newGame',
  components: {
    NewGame
  }
}
</script>

<style scoped lang="scss">
.home {
  margin: 0 auto;
}
</style>
