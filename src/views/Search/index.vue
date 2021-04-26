<template>
  <div class="searchContainer">
    <div class="topSearch">
      <div class="back" @click="back">
        <van-icon name="arrow-left" />
      </div>
      <div class="search">
        <van-search
          v-model="value"
          show-action
          placeholder="请输入搜索关键词"
          @input="onInput"
          @search="onSearch"
          @focus="handleFocus"
        >
          <template #action>
            <div @click="onSearch" v-show="resultLsit.length === 0">搜索</div>
            <div
              @click="toShoppingCar"
              v-show="resultLsit.length != 0"
              class="car"
            >
              <van-icon name="cart-o" :badge="count" />
            </div>
          </template>
        </van-search>
        <div class="likeList">
          <div
            class="likeItem"
            v-for="item in likeList"
            :key="item"
            v-html="formatHTML(item)"
            @click="likeClick(item)"
          ></div>
        </div>
      </div>
    </div>
    <div class="showList">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="
            resultLsit.length === 0 ? '暂无搜索结果' : '没有更多了'
          "
          @load="onLoad"
          :immediate-check="false"
        >
          <GoodsCard v-for="item in resultLsit" :info="item" :key="item.id" />
        </van-list>
      </van-pull-refresh>
    </div>
    <div class="history" v-show="!isHideHistory">
      <div class="title">历史记录：</div>

      <div
        class="historyItem"
        v-for="item in historyList"
        :key="item"
        @click="likeClick(item)"
      >
        {{ item }}
      </div>
      <div class="info historyItem" v-show="historyList.length == 0">
        无
      </div>
      <div
        class="empty historyItem"
        v-show="historyList.length != 0"
        @click="emptyClick"
      >
        <van-icon name="delete-o" />
      </div>
    </div>
  </div>
</template>

<script>
import { likeSearch, search } from "@/api/goods";
import GoodsCard from "@/components/GoodsCard";
export default {
  components: {
    GoodsCard,
  },
  computed: {
    searchValue() {
      return this.value.replace(/\s*/g, "");
    },
    isHideHistory() {
      if (this.resultLsit.length !== 0 || this.likeList != 0) {
        return true;
      }
      return false;
    },
    count() {
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
      value: "",
      inputTimer: null,
      likeList: [],
      resultLsit: [],
      page: 1,
      loading: false,
      total: 0,
      finished: false,
      refreshing: false,
      size: 6,
      historyList: [],
    };
  },
  methods: {
    async search() {
      this.setHistory(this.value.replace(/\s*/g, ""));
      this.finished = false;
      const list = await search({
        type: this.value.replace(/\s*/g, ""),
        page: this.page,
        size: this.size,
      });
      this.resultLsit = list.list;
      this.total = list.total;
      if (this.resultLsit.length === list.total) {
        this.finished = true;
      }
      console.log(this.resultLsit);
    },
    async onSearch() {
      this.finished = false;
      this.page = 1;
      await this.search();
      this.likeList = [];
    },

    onInput() {
      if (!this.value.replace(/\s*/g, "")) {
        clearTimeout(this.inputTimer);
        this.likeList = [];
      } else {
        console.log(this.value.replace(/\s*/g, ""));
        clearTimeout(this.inputTimer);
        this.inputTimer = setTimeout(async () => {
          const list = await likeSearch({
            likeValue: this.value.replace(/\s*/g, ""),
          });
          this.likeList = list.result;
          console.log(this.likeList);
        }, 200);
      }
    },
    formatHTML(value) {
      const reg = new RegExp(this.value.replace(/\s*/g, ""), "g");
      return value.replace(
        reg,
        this.value.replace(/\s*/g, "").fontcolor("red")
      );
    },
    likeClick(value) {
      this.likeList = [];
      this.page = 1;
      this.value = value;
      this.onSearch();
    },
    async onLoad() {
      console.log("load");
      this.page += 1;
      console.log(this.value, this.page, this.size);
      const list = await search({
        type: this.value.replace(/\s*/g, ""),
        page: this.page,
        size: this.size,
      });
      this.resultLsit = this.resultLsit.concat(list.list);
      this.total = list.total;
      if (this.resultLsit.length === list.total) {
        this.finished = true;
      }
      this.loading = false;
    },
    async onRefresh() {
      this.finished = false;
      this.page = 1;
      this.search();
      this.refreshing = false;
    },
    handleFocus() {
      this.resultLsit = [];
    },
    back() {
      this.$router.go(-1);
    },
    setHistory(value) {
      const index = this.historyList.indexOf(value);
      if (index != -1) {
        this.historyList.splice(index, 1);
      }
      const length = this.historyList.unshift(value);
      if (length >= 10) {
        this.historyList.pop();
      }
      localStorage.setItem("historyList", JSON.stringify(this.historyList));
    },
    emptyClick() {
      this.$dialog
        .confirm({
          message: `您确定要删除全部历史记录吗？`,
        })
        .then(() => {
          this.historyList = [];
          localStorage.setItem("historyList", JSON.stringify(this.historyList));
        })
        .catch(() => {
          return;
        });
    },
    toShoppingCar() {
      this.$router.push({ name: "Shopping" });
    },
  },
  created() {
    if (localStorage.historyList) {
      this.historyList = JSON.parse(localStorage.historyList) || [];
    }
  },
};
</script>

<style lang="less">
.searchContainer {
  height: 100%;
  .topSearch {
    display: flex;
    align-items: center;
    .back {
      padding-left: 10px;
      padding-top: 10px;
      font-size: 20px;
    }
    .search {
      width: 100%;
      position: relative;
      .car {
        font-size: 22px;
      }
      .likeList {
        width: 100%;
        position: absolute;
        padding-left: 12px;
        z-index: 49;
        background-color: #fff;
        .likeItem {
          box-sizing: border-box;
          font-size: 14px;
          padding: 10px 0 10px 16px;
          margin-right: 30px;
          border-bottom: 0.5px solid #ddd;
        }
      }
    }
  }
  .showList {
    // height: 100%;
    max-height: 100%;

    box-sizing: border-box;
    padding-bottom: 50px;
    overflow-y: auto;
  }
  .history {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .title {
      height: 30px;
      text-align: center;
      margin: 5px;
      margin-left: 40px;
      line-height: 30px;
      font-weight: bold;
    }

    .historyItem {
      height: 30px;
      background-color: #ddd;
      border-radius: 5px;
      margin: 5px;

      line-height: 30px;
      white-space: nowrap;
      text-align: center;
      min-width: 30px;
    }
    .info {
      background-color: inherit;
    }
    .empty {
      min-width: 40px;
      font-size: 20px;
      background-color: inherit;
      line-height: 30px;
      box-sizing: border-box;
      padding-top: 3px;
    }
  }
}
</style>
