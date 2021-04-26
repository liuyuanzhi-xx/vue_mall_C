<template>
  <div
    class="goodsCardContainer"
    v-show="!isHide || $store.state.shoppingCar.countMap[info.id]"
  >
    <div class="imgContainer"><img :src="info.images[0]" alt="" /></div>
    <div class="goodsInfo">
      <div class="title">{{ info.title }}</div>
      <div class="desc">{{ info.desc }}</div>
      <div class="tags">
        <div v-for="item in info.tags" :key="item">{{ item }}</div>
      </div>
      <div class="container">
        <div class="price">
          <div class="priceOff" v-if="info.price_off">
            ￥{{ info.price_off }}
          </div>
          <div :class="{ invalid: info.price_off }">￥{{ info.price }}</div>
        </div>
        <div class="buy">
          <span
            class="reduce"
            @click="reduce({ id: info.id, value: -1 })"
            v-show="$store.state.shoppingCar.countMap[info.id]"
            >-</span
          >
          <span class="count">{{
            $store.state.shoppingCar.countMap[info.id]
          }}</span>
          <span class="add" @click="reduce({ id: info.id, value: +1 })">+</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
    },
    tips: {
      type: Boolean,
      default: false,
    },
    isHide: {
      type: Boolean,
      default: false,
    },
  },
  computed: {},
  data() {
    return {};
  },
  methods: {
    reduce(options) {
      console.log(options.id, options.value);
      // console.log(this.$store);
      if (this.tips) {
        if (
          this.$store.state.shoppingCar.countMap[options.id] === 1 &&
          options.value === -1
        ) {
          this.$dialog
            .confirm({
              title: "您是否要删除这个商品？",
              message: `${this.info.title}`,
            })
            .then(() => {
              this.$store.commit("shoppingCar/setCountMap", {
                id: options.id,
                value: options.value,
              });
            })
            .catch(() => {
              return;
            });
        } else {
          this.$store.commit("shoppingCar/setCountMap", {
            id: options.id,
            value: options.value,
          });
        }
      } else {
        this.$store.commit("shoppingCar/setCountMap", {
          id: options.id,
          value: options.value,
        });
      }
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.goodsCardContainer {
  display: flex;
  width: 100%;
  min-height: 110px;
  align-items: center;
  margin-top: 5px;
  .imgContainer {
    min-width: 90px;
    min-height: 90px;
    max-width: 90px;
    max-height: 90px;
    margin-right: 20px;
    padding: 5px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .goodsInfo {
    width: 100%;
    overflow: hidden;
    > div {
      margin-bottom: 2px;
    }
    color: #aaa;
    .title {
      font-size: 13px;
      color: #1a1a1a;
      margin-bottom: 5px;
    }
    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .price {
        padding-top: 3px;
        font-size: 16px;
        font-weight: bold;
        color: #ff8c00;
        display: flex;
        align-items: center;
        .invalid {
          font-weight: normal;
          color: #aaa;
          font-size: 14px;
          text-decoration: line-through;
          line-height: 16px;
          margin-left: 5px;
        }
      }
      .buy {
        float: right;
        margin-right: 10px;
        > span {
          display: inline-block;
          &:not(.count) {
            color: #fff;
            border-radius: 50%;
            background-color: #ff8c00;
            width: 16px;
            height: 16px;
            font-size: 16px;
            text-align: center;
            line-height: 16px;
          }
          &.count {
            margin: 0 5px;
            font-size: 16px;
            height: 16px;
            line-height: 16px;
          }
        }
      }
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      > div {
        border: 1px solid #ddd;
        border-radius: 2px;
        padding: 2px;
        margin-right: 5px;
        white-space: nowrap;
      }
    }
  }
}
</style>
