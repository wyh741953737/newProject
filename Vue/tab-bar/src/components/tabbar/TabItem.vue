<template>
   <div class="tab-bar-item" @click="itemClick">
       <div>
           <slot v-if="!isActive" name="item-icon"></slot>
           <slot v-else name="item-icon-active"></slot>
       </div>
       <div :class="{active:isActive}">
           <slot name="item-text"></slot>
        </div>
       <div>
           <slot name="item-text"></slot>
       </div>
   </div>
</template>

<script>

export default {
  name: 'TabItem',
  props: {
      path: String,
      activeColor: {
          type: String,
          default: 'red'
      }
  },
  mounted() {
      console.log(this.$router)
  },
  data() {
    return {
        // isActive: false
    }
  },
  methods: {
      itemClick() {
          console.log(this.$router)
          this.$router.replace(this.path)
      }
  },
  computed: {
      isActive() {
        //   return this.$router.path.indexOf(this.path) !== -1
        return true
      },
      isActiveColor() {
          return this.isActive ? {color:this.activeColor} : {}
      }
  },
}
</script>
<style scoped>
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