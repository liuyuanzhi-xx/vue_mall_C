<template>
  <div class="submitBarContainer">
    <van-submit-bar
      :price="price * 100"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <van-checkbox :value="checked" @click="handleChange">全选</van-checkbox>
      <!-- <template #tip>
         你的收货地址不支持同城送,
        <span @click="onClickEditAddress">修改地址</span>
      </template> -->
    </van-submit-bar>
  </div>
</template>

<script>
export default {
  props: {
    price: {
      type: Number,
      default: 0,
    },
    checked: {
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  methods: {
    onSubmit() {},
    handleChange() {
      console.log(this.checked);
      this.$emit("change", !this.checked);
    },
  },
};
</script>

<style></style>
