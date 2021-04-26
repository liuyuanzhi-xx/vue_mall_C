<template>
  <!-- <div class="hideScroll"> -->
  <div class="secondMenuContainer">
    <van-sidebar v-model="myActiveKey" @change="onChange">
      <template v-for="item in menuList">
        <van-sidebar-item
          :title="typeof item === 'number' ? '全部' : item"
          :key="item"
        />
      </template>
    </van-sidebar>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  props: {
    menuList: {
      type: Array,
    },
    activeKey: {
      type: Number,
      default: 0,
    },
  },
  computed: {},
  data() {
    return {
      myActiveKey: 0,
    };
  },
  methods: {
    onChange(e) {
      console.log(e);
      this.$emit("handleChange", e);
    },
  },
  watch: {
    activeKey: function(newValue, oldValue) {
      // console.log(newValue, "------");
      this.myActiveKey = newValue;
    },
  },
};
</script>

<style lang="less" scoped>
.secondMenuContainer {
  width: 80px;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  text-align: center;
  padding-bottom: 138px;
  background-color: #f7f8fa;
  // display: inline-block;
}
.secondMenuContainer::-webkit-scrollbar {
  display: none;
}
</style>
