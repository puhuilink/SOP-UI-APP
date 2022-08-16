<template>
  <view class="container">
       <Navbar title="消息详情" />
   <u-row>
          <u-col span="12">
            <view class="time"> {{ listData.published_at }} </view>
          </u-col>
        </u-row>
        <view class="list-item">
          <view class="account">
            <view>{{listData.id}}</view>
          </view>
          <view class="record">
            <view>{{listData.author_name}}</view>
            <view>{{listData.name}}</view>
          </view>
          <u-divider ></u-divider>
         <u--text :text="listData.value"></u--text>
        </view>
  </view>
</template>

<script>
import uTabs from "../../uni_modules/uview-ui/components/u-tabs/u-tabs.vue";
import Navbar from "@/components/navbar/navbar";
export default {
  components: { uTabs, Navbar },
  data() {
    return {
      listData: {
          id: "S20220531199",
          title: "01-财务账号问题",
          author_name: "二线人员王明已处理",
          name: "记录人高得",
          published_at: "2022-07-22 08:19",
          value: "这是一个财务账号问题，希望可以进行相关申请。。。。",
        }, 
    };
  },

  methods: {
   
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
  min-height: 165rpx;
  background: #ffffff;
  border-radius: 17rpx;
  padding: 30rpx 28rpx;
  box-sizing: border-box;

  .account {
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