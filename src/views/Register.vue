<template>
  <div class="home">
    <h1>Register</h1>
    <Register />
  </div>
</template>

<script>
// @ is an alias to /src
import Register from '../components/Register.vue'

export default {
  name: 'register',
  components: {
    Register
  }
}
</script>

<style scoped lang="scss">
.home {
  margin: 0 auto;
}
</style>
