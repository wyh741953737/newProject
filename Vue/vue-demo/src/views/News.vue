<template>
  <div class="about">
    <ul>
      <li @click="newClick">新闻1</li>
      <!-- <router-link to="/news/detail">新闻详情</router-link> -->
      
      <router-view></router-view>
    </ul>
  </div>
</template>
<script>
export default {
  methods: {
    newClick() {
      this.$router.push('/detail')
    }
  }
}
</script>