<template>
  <view class="container">
    <u-sticky bgColor="#fff">
      <view class="search-box">
        <u-search
          placeholder="请输入查询条件"
          bgColor="#fff"
          placeholderColor="#999999"
          :show-action="false"
          searchIconColor="#000"
          height="75rpx"
          shape="square"
          :inputStyle="{ padding: '0 30rpx' }"
          v-model="keyword"
          @change="search"
          @clickIcon="search"
        />
      </view>
    </u-sticky>
    <u-list :pagingEnabled="true">
      <u-list-item v-for="(item, index) in listData" :key="index">
        <u-row>
          <u-col span="12">
            <view class="time"> {{ item.createTime }} </view>
          </u-col>
        </u-row>
        <view class="list-item">
          <view class="level1">{{ item.value }}</view>
          <view class="account">
            <view>{{item.suspensionState}}</view>
            <view>{{item.processInstance.id}}</view>
          </view>
          <view class="record">
            <view>{{item.processInstance.name}}</view>
            <view>{{item.processInstance.startUserNickname}}</view>
          </view>
        </view>
      </u-list-item>
    </u-list>
  </view>
</template>

<script>
import uTabs from "../../uni_modules/uview-ui/components/u-tabs/u-tabs.vue";
import { getHaveDoList } from "@/api/list.js";
export default {
  components: { uTabs },
  data() {
    return {
      // 每页数据量
      pageSize: 10,
      // 当前页
      pageNo: 1,
      // 数据总量
      total: 0,
      loading: false,
      keyword: "",
      listData:[]
    };
  },
    onLoad() {
    this.getHavedolist();
  },
   methods: {
    //转换时间戳
    formatDate(timeStamp) {
      var date = new Date(timeStamp);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
    },
    // 获取列表
    async getHavedolist() {
      this.loading = true;
      await getHaveDoList({
        pageSize: this.pageSize,
        pageNo: this.pageNo,
      }).then((res) => {
        this.listData = res.data.list;
        //res.data.list的时间戳转换
        this.listData.forEach((item) => {
          item.createTime = this.formatDate(item.createTime);
        });
        this.total = res.data.total;
        this.loading = false;
      });
    },
    // 分页触发
    async change(e) {
      this.$refs.table.clearSelection();
      this.pageNo = e.current;
      this.getHavedolist();
    },
    //详情页
    detail() {
      uni.navigateTo({
        url: "/pages/list/detail",
      });
    },
      search() {
      console.log(this.keyword)
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding-left: 0px;
  padding-right: 0px;
  font-size: 12px;
}
.search-box {
  background: #f1f4f5;
  padding: 17rpx 15rpx 0;
}
.time {
  height: 35rpx;
  font-size: 25rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #afb1b5;
  line-height: 35rpx;
  margin: 23rpx;
  text-align: center;
}
.u-list {
  height: calc(100vh - 300rpx) !important;
}
.list-item {
  margin: 0 auto;
  width: 719rpx;
  min-height: 185rpx;
  background: #ffffff;
  border-radius: 17rpx;
  padding-bottom: 30rpx;
  box-sizing: border-box;

  .level1,
  .level2,
  .level3 {
    width: 65rpx;
    height: 38rpx;
    border-top-left-radius: 17rpx;
    border-bottom-right-radius: 17rpx;
    background: #fd5b5b;
    line-height: 38rpx;
    font-size: 29rpx;
    font-family: DINAlternate-Bold, DINAlternate;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
    margin-bottom: 19rpx;
  }

  .level2 {
    background: #f08743;
  }

  .level3 {
    background: #3080f5;
  }

  .account {
    padding: 0 28rpx;
    height: 46rpx;
    line-height: 46rpx;
    font-size: 33rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    display: flex;
    justify-content: space-between;
  }

  .record {
    padding: 0 28rpx;
    margin-top: 23rpx;
    display: flex;
    justify-content: space-between;
    height: 29rpx;
    font-size: 29rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #878b8f;
    line-height: 29rpx;
  }
}
</style>