<template>
  <div id="app">
    <!-- <router-view></router-view> -->
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from './components/tabbar/MainTabBar'
export default {
  name: 'App',
  components: {
    MainTabBar
  },
   mounted() {
      console.log('route',this.$route)
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    box-shadow: 0 -1px 1px rgba(100, 100,100,.2);
  }
.tab-bar-item img {
    width: 24px;
    height: 24px;
}
</style>
