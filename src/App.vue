<template>
  <div id="app">
    <Layout />
  </div>
</template>

<script>
import Layout from "@/components/Layout";
export default {
  components: {
    Layout,
  },
  created() {
    console.log(localStorage.shoppingCar);
    if (localStorage.shoppingCar && localStorage.shoppingCar !== "{}") {
      this.$store.commit(
        "shoppingCar/initCountMap",
        JSON.parse(localStorage.shoppingCar)
      );
    }
  },
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
  overflow: hidden;
}
</style>
