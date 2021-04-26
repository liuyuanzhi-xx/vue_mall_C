<template>
  <div class="tabBalContainer">
    <van-tabbar
      v-model="value"
      active-color="#FF8C00"
      inactive-color="#646566"
      :route="true"
    >
      <van-tabbar-item icon="home-o" :to="{ name: 'Home' }"
        >首页</van-tabbar-item
      >
      <van-tabbar-item icon="apps-o" :to="{ name: 'Category' }"
        >分类</van-tabbar-item
      >
      <van-tabbar-item
        icon="cart-o"
        :to="{ name: 'Shopping' }"
        :badge="shoppingBadge"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item icon="user-o" :to="{ name: 'Mine' }"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  components: {},
  computed: {
    shoppingBadge() {
      const countMap = this.$store.state.shoppingCar.countMap;
      let sum = 0;
      for (const item in countMap) {
        if (countMap[item]) {
          sum += countMap[item];
        }
      }
      if (sum > 99) {
        return "99+";
      } else if (sum == 0) {
        return "";
      } else {
        return sum;
      }
    },
  },
  data() {
    return {
      value: 0,
    };
  },

  created() {},
};
</script>

<style></style>
