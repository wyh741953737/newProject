<template>
  <tab-bar>
      <tab-item path="/home" activeColor="red">
        <img slot="item-icon" alt="Vue logo" src="../../assets/logo.png">
        <img slot="item-icon-active" alt="Vue logo" src="../../assets/logo.png">
        <div slot="item-text">首页</div>
      </tab-item>
      <tab-item path="/category" activeColor="red">
        <img slot="item-icon" alt="Vue logo" src="../../assets/logo.png">
        <img slot="item-icon-active" alt="Vue logo" src="../../assets/logo.png">
        <div slot="item-text">分类</div>
      </tab-item>
      <tab-item path="/cart" activeColor="red">
        <img slot="item-icon" alt="Vue logo" src="../../assets/logo.png">
        <img slot="item-icon-active" alt="Vue logo" src="../../assets/logo.png">
        <div slot="item-text">购物车</div>
      </tab-item>
      <tab-item path="/profile" activeColor="red">
        <img slot="item-icon" alt="Vue logo" src="../../assets/logo.png">
        <img slot="item-icon-active" alt="Vue logo" src="../../assets/logo.png">
        <div slot="item-text">我的</div>
      </tab-item>
 </tab-bar>
</template>
<script>
import TabBar from './TabBar'
import TabItem from './TabItem'
export default {
    name: 'MainTabBar',
    components: {
        TabBar,
        TabItem
    }
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