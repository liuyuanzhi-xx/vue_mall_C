<template>
  <div class="firstMenuContainer">
    <div
      class="menuItem"
      v-for="item in menuList"
      :key="item.title"
      :class="{ active: active == item.title }"
      @click="handleClick(item.title)"
    >
      <div class="imgContainer">
        <img :src="item.imgURL" alt="" />
      </div>
      <div class="titleContainer">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menuList: {
      type: Array,
    },
  },
  data() {
    return {
      active: "时令水果",
    };
  },
  methods: {
    handleClick(e) {
      //   console.log(e);
      this.active = e;
      this.$emit("handleChange", e);
    },
  },
};
</script>

<style lang="less" scoped>
.firstMenuContainer::-webkit-scrollbar {
  display: none;
}
.firstMenuContainer {
  height: 94px;
  overflow-x: auto;
  display: flex;
  .menuItem {
    width: 50px;
    height: 70px;
    margin: 10px 5px;
    .imgContainer {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      border: 2px solid #fff;
      border-radius: 23px;
      img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
      }
    }
    .titleContainer {
      width: 54px;
      border-radius: 30px;
      font-weight: bold;
      text-align: center;
    }
  }
  .active {
    .imgContainer {
      border-color: @orange;
    }
    .titleContainer {
      color: #fff;

      background-color: @orange;
    }
  }
}
</style>
