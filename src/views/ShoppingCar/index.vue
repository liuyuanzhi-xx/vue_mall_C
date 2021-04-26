<template>
  <div class="shoppingCarContainer">
    <div class="topBar">
      <van-nav-bar
        title="购物车"
        right-text="删除"
        @click-right="onClickRight"
      />
    </div>
    <template v-if="idList.length === 0 && !loading">
      <van-empty
        class="custom-image"
        image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
        description="快去挑选心水的商品吧！"
      />
    </template>
    <template v-else>
      <div class="cardList" v-if="goodsList.length != 0">
        <van-checkbox-group v-model="result" ref="checkboxGroup">
          <div class="cardItem" v-for="item in goodsList" :key="item.id">
            <div
              class="checkBox"
              v-if="$store.state.shoppingCar.countMap[item.id]"
            >
              <van-checkbox :name="item.id"></van-checkbox>
            </div>
            <GoodsCard :info="item" :tips="true" :isHide="true" /></div
        ></van-checkbox-group>
      </div>
    </template>
    <SubmitBar @change="handleChange" :price="price" :checked="checked" />
    <div class="loading" v-if="loading">
      <van-loading color="#FF8C00" />
    </div>
  </div>
</template>

<script>
import { getGoodsListById } from "@/api/goods";
import GoodsCard from "@/components/GoodsCard";
import SubmitBar from "@/views/ShoppingCar/SubmitBar";
export default {
  components: {
    GoodsCard,
    SubmitBar,
  },
  computed: {
    idList() {
      return Object.keys(this.$store.state.shoppingCar.countMap);
    },
    isCheck() {
      return id;
    },
    price() {
      let priceList = [];
      if (this.result.length != 0) {
        // console.log(this.result);
        // console.log(this.goodsList);
        priceList = this.result.map((item) => {
          const goodsInfo = this.goodsList.find((goods) => {
            return goods.id == item;
          });
          // console.log(goodsInfo);
          return {
            price: goodsInfo.price_off || goodsInfo.price,
            count: this.$store.state.shoppingCar.countMap[item] || 0,
          };
        });
      }
      // console.log(priceList);
      let price = 0;
      if (priceList.length != 0) {
        priceList.forEach((item) => {
          price += item.price * item.count;
        });
      }

      return price;
    },
  },
  data() {
    return {
      goodsList: [],
      countMap: {},
      total: 0,
      checked: false,
      result: [],
      loading: false,
    };
  },
  methods: {
    onClickRight() {
      if (this.result.length === 0) {
        this.$toast("请选择商品");
        return;
      }
      this.$dialog
        .confirm({
          message: `您确定要删除已选择中商品吗？`,
        })
        .then(() => {
          const list = [...this.result];
          list.forEach((item) => {
            this.result = this.result.filter((t) => t != item);
            this.$store.commit("shoppingCar/deleteCountMapById", item);
          });
        })
        .catch(() => {
          return;
        });
    },
    handleChange(check) {
      console.log(check);
      this.checked = check;
      if (!this.$refs.checkboxGroup) {
        this.$toast("您的购物车空空如也");
        this.checked = false;
        return;
      }
      if (check) {
        console.log("全选");
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        console.log("全不选");
        this.$refs.checkboxGroup.toggleAll();
      }
    },
    getIds() {
      console.log(this.result);
    },
  },
  async created() {
    this.loading = true;
    const res = await getGoodsListById(this.idList.toString());
    this.loading = false;
    this.total = res.length;
    this.goodsList = res.list;
    console.log(this.goodsList);
  },
  watch: {
    result(newValue, oldValue) {
      if (newValue.length == this.idList.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
  },
};
</script>

<style lang="less">
.shoppingCarContainer {
  height: 100%;
  position: relative;
  .cardList {
    height: 100%;
    padding-bottom: 50px;
    box-sizing: border-box;
    overflow-y: auto;
    .van-checkbox-group {
      padding-bottom: 50px;
    }
    .cardItem {
      display: flex;
      align-items: center;
      .checkBox {
        margin: 0 5px;
      }
    }
  }
  .custom-image {
    height: 100%;
  }
  .custom-image .van-empty__image {
    width: 70px;
    height: 70px;
  }
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
