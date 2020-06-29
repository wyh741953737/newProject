<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <br/>
    <router-link to="/news">News</router-link> |
    <router-link to="/messages">Messages</router-link>
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'Home',
  data() {
    return {
      activated() {
        this.$router.push(this.path)
      },
      beforeRouteLeave (to, from, next) {
        this.path = this.$route.path
        next()
      }
    }
  },
}
</script>
