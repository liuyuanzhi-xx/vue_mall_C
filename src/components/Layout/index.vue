<template>
  <div class="layoutContainer">
    <div class="mainContainer">
      <router-view></router-view>
    </div>
    <TabBar />
  </div>
</template>

<script>
import TabBar from "@/components/TabBar";
export default {
  components: {
    TabBar,
  },
};
</script>

<style lang="less">
.layoutContainer {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  .mainContainer {
    box-sizing: border-box;
    padding-bottom: 50px;
    height: 100vh;
    width: 100%;
    overflow: hidden;
  }
}
</style>
