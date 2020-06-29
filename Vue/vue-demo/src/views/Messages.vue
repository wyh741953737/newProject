<template>
  <div class="about">
    <h2>ffff</h2>
    <h2>{{this.$route.params.id}}</h2>
  </div>
</template>
<script>
export default {
  name: 'user',
  computed: {
    userId() {
      return this.$route.params.id
    }
  }
}
</script>
