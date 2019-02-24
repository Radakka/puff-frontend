<template>
  <div class="home">
    <h1>Puff</h1>
    <Login />
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '../components/Login.vue'

export default {
  name: 'home',
  components: {
    Login
  }
}
</script>

<style scoped lang="scss">
.home {
  margin: 0 auto;
}
</style>
