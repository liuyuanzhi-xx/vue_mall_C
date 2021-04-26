<template>
  <div class="categoryContainer">
    <SearchBar />

    <FirstMenu :menuList="firstMenu" @handleChange="handleFirstChange" />
    <div class="main">
      <div v-if="secondMenu.length != 0">
        <SecondMenu
          :menuList="secondMenu"
          :activeKey="activeKey"
          @handleChange="handleSecondChange"
        />
      </div>
      <div class="showContainer">
        <div class="operateBar" @click="handleClick">
          <div class="all" type="all" :class="{ active: soreType === 'all' }">
            综合
          </div>
          <div
            class="sale"
            type="sale"
            :class="{ active: soreType === 'sale' }"
          >
            销量
          </div>
          <div
            class="price"
            :type="priceType"
            :class="{
              active: soreType === 'price-up' || soreType === 'price-down',
            }"
          >
            价格
            <div
              class="icon"
              :class="{
                up: soreType === 'price-up',
                down: soreType === 'price-down',
              }"
            ></div>
          </div>
        </div>
        <div class="cardList" ref="cardList">
          <template v-if="goodsType != ''">
            <van-pull-refresh
              v-model="topLoading"
              @refresh="onRefresh"
              success-text="刷新成功"
            >
              <div class="list">
                <van-list
                  v-model="bottomLoading"
                  :finished="finished"
                  :finished-text="
                    goodsList.length === 0 ? '暂无商品' : '没有更多了'
                  "
                  :immediate-check="false"
                  @load="onLoad"
                >
                  <GoodsCard
                    v-for="item in goodsList"
                    :info="item"
                    :key="item.id"
                  />
                </van-list>
              </div>
            </van-pull-refresh>
          </template>
        </div>
      </div>
    </div>
    <div class="loading" v-if="loading">
      <van-loading color="#FF8C00" />
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import FirstMenu from "./FirstMenu";
import SecondMenu from "./SecondMenu";
import GoodsCard from "@/components/GoodsCard";
import { getSidebar } from "@/api/category";
import { getGoodsList } from "@/api/goods";
import { Toast } from "vant";
export default {
  components: {
    SearchBar,
    FirstMenu,
    SecondMenu,
    GoodsCard,
  },
  data() {
    return {
      firstMenu: [
        {
          title: "时令水果",
          imgURL:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-091208%2F2hhnytgitsu2hhnytgitsu.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620344255&t=c9bb2e2780573c4f21f94ccae8a47034",
        },
        {
          title: "酒水冲调",
          imgURL:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1382477887,1952574594&fm=26&gp=0.jpg",
        },
        {
          title: "安心乳品",
          imgURL:
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2701051123,1049505611&fm=26&gp=0.jpg",
        },
        {
          title: "休闲零食",
          imgURL:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3241306214,4128201507&fm=26&gp=0.jpg",
        },
        {
          title: "肉蛋食材",
          imgURL:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdpic.tiankong.com%2F2c%2Fnb%2FQJ8284486907.jpg&refer=http%3A%2F%2Fdpic.tiankong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620344575&t=a89cb2f4bb3c9097982cf9fbd054f938",
        },
        {
          title: "新鲜蔬菜",
          imgURL:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2670925240,2875550899&fm=26&gp=0.jpg",
        },
        {
          title: "熟食餐饮",
          imgURL:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4173884177,4279941429&fm=26&gp=0.jpg",
        },
        {
          title: "海鲜水产",
          imgURL:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4073969800,3078281211&fm=26&gp=0.jpg",
        },
        {
          title: "粮油调味",
          imgURL:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ftu.ossimage.com%3A9186%2Fgroup2%2FM00%2F5B%2F6E%2FrBgICV3c9M2AXCnNAAGMEq5YuJc422.jpg&refer=http%3A%2F%2Ftu.ossimage.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620344790&t=a9561ba04636a1536a78dd9101152658",
        },
        {
          title: "某手美食",
          imgURL:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fwallpaper%2F1407%2F18%2Fc0%2F36438391_1405652988442_800x600.jpg&refer=http%3A%2F%2Fimg.pconline.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620344831&t=b453946764e205905c178cae08e17b80",
        },
        {
          title: "纸杯清洁",
          imgURL:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi05.c.aliimg.com%2Fimg%2Fibank%2F2015%2F865%2F929%2F2055929568_670122230.jpg&refer=http%3A%2F%2Fi05.c.aliimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620344911&t=73d4f5f6141a65d250193e29e5c1516a",
        },
        {
          title: "个人护理",
          imgURL:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.cnv-china.com%2Fattached%2Fimage%2F20150310%2F2015031022380493493.jpeg&refer=http%3A%2F%2Fwww.cnv-china.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620344947&t=46c03faf59bc94c79ff6bb52c50bf5f6",
        },
        {
          title: "美妆护肤",
          imgURL:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F17%2F08%2F16%2F71582a9e84818adcbe93f9994841b9fd.jpg&refer=http%3A%2F%2Fku.90sjimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620344971&t=fdecf82cd3fe8cabab9a14bdc38f8089",
        },
        {
          title: "家居收纳",
          imgURL:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.zhimg.com%2Fv2-8ca8420a552a01c18aa2541d9c819d8c_1200x500.jpg&refer=http%3A%2F%2Fpic1.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620345012&t=a06245eb2d760f882dfff8a818437156",
        },
        {
          title: "家用电器",
          imgURL:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7b9dc506fe4b7a17be3eda07817bacdf3230094e25b5b-Ipj213_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620345044&t=a08a2e30f2f119acd10f8983d044394c",
        },
        {
          title: "3C数码",
          imgURL:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01e90d56ff87986ac72579483dcd95.JPG%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620345112&t=9cc1772ba334e4cfe84b6c223da11930",
        },
        {
          title: "母婴用品",
          imgURL:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2015%2F074%2F842%2F2547248470_1802054270.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620345156&t=a92cc6c9d4c13c95d7e8c84e40d7133b",
        },
        {
          title: "鲜花绿植",
          imgURL:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F11e5ef59fe874862b1c7d7d5c33b005dcf9974ca27860-PyOxrv_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620345184&t=c03627eb5cbe28be8a345fc7ced72646",
        },
        {
          title: "宠物用品",
          imgURL:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3732436494,23499783&fm=26&gp=0.jpg",
        },
        {
          title: "图书玩具",
          imgURL:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.58cdn.com.cn%2Fzhuanzh%2Fn_v1bl2lwkgpilrfr6mkvv7a_750_0.jpg&refer=http%3A%2F%2Fpic4.58cdn.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620345235&t=de569ec1e9135616ad10f6e598706b86",
        },
        {
          title: "手表配饰",
          imgURL:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=102653177,2580725849&fm=15&gp=0.jpg",
        },
      ],
      secondMenu: [],
      goodsList: [],
      activeKey: 0,
      priceType: "price-up",
      soreType: "all",
      total: 0,
      page: 1,
      topLoading: false,
      loading: false,
      finished: false,
      bottomLoading: false,
    };
  },
  computed: {
    goodsType() {
      return this.secondMenu[this.activeKey] || "";
    },
  },
  methods: {
    async handleFirstChange(e) {
      this.finished = false;
      this.loading = true;
      this.secondMenu = await getSidebar(e);
      this.loading = false;
      this.activeKey = 0;
      this.page = 1;
      await this.getList();
    },
    async handleSecondChange(e) {
      this.finished = false;
      this.activeKey = typeof e === "number" ? e : this.activeKey;
      this.soreType = "all";
      this.page = 1;
      await this.getList();
    },
    async handleClick(e) {
      this.finished = false;
      const type = e.target.getAttribute("type");
      if (this.soreType === type) return;
      this.soreType = type;
      this.page = 1;
      if (type === "price-up") {
        this.priceType = "price-down";
      } else if (type === "price-down") {
        this.priceType = "price-up";
      }
      this.bottomLoading = true;
      await this.getList();
      this.bottomLoading = false;
    },
    async onLoad() {
      console.log("onload");
      await this.getMore();

      this.bottomLoading = false;
    },
    async getList(isClear = true) {
      if (isClear) {
        this.goodsList = [];
      }
      this.$refs.cardList.scrollTop = 0;
      const list = await getGoodsList({
        type: this.goodsType,
        page: this.page,
        size: 10,
        sort: this.soreType,
      });
      this.total = list.total;
      this.goodsList = list.list;
      if (this.goodsList.length == this.total) {
        this.finished = true;
      }
    },
    async getMore() {
      if (this.goodsList.length == 0) {
        this.page = 1;
      }
      this.page += 1;
      const list = await getGoodsList({
        type: this.goodsType,
        page: this.page,
        size: 10,
        sort: this.soreType,
      });
      this.total = list.total;
      if (list.list.length != 0) {
        this.goodsList = this.goodsList.concat(list.list);
      }
      if (this.goodsList.length == this.total) {
        this.finished = true;
      }
      if (this.goodsList.length == 10 || this.goodsList.length == 0) {
        this.page = 1;
      }
    },
    async onRefresh() {
      this.page = 1;
      this.finished = false;
      await this.getList(false);
      this.topLoading = false;
    },
  },
  async created() {
    this.loading = true;
    this.secondMenu = await getSidebar(this.firstMenu[0].title);
    console.log(this.secondMenu);
    this.getList();
    this.loading = false;
  },
};
</script>

<style lang="less" scoped>
.categoryContainer {
  height: 100%;
  overflow: hidden;
  position: relative;
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .main {
    height: 100%;
    overflow: hidden;
    display: flex;
    .showContainer {
      width: 100%;
      .operateBar {
        width: 100%;
        height: 25px;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-end;
        padding: 0 4px;
        border-top: 1px solid #f7f8fa;
        border-bottom: 1px solid #f7f8fa;
        > div {
          min-width: 50px;
          height: 25px;
          line-height: 25px;
          text-align: center;
          display: inline-block;
          &.price {
            display: flex;
            justify-content: center;
          }
          &.active {
            font-weight: bold;
            color: @orange;
          }
          .icon {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 5px;
          }
          .icon::before,
          .icon::after {
            width: 0;
            height: 0;
            content: "";
            border: 4px solid transparent;
            border-bottom-color: #aaa;
          }
          .icon::after {
            margin-top: 1px;
            border-bottom-color: transparent;
            border-top-color: #aaa;
          }
          .up::before {
            border-bottom-color: @orange;
          }
          .down::after {
            border-top-color: @orange;
          }
        }
      }
      .cardList {
        min-height: 300px;
        height: 100%;
        overflow-y: auto;
        box-sizing: border-box;
        padding-bottom: 163px;
      }
    }
  }
}
</style>
