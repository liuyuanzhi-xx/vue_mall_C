<template>
  <div class="searchBarContainer">
    <router-link :to="{ name: 'Search' }">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        shape="round"
        input-align="center"
      />
    </router-link>
  </div>
</template>

<script>
import { Search } from "vant";
export default {
  components: {
    [Search.name]: Search,
  },
  data() {
    return {
      value: "",
    };
  },
};
</script>

<style scoped lang="less">
.searchBarContainer {
  color: #a1a1a1;
}
</style>
