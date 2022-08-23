<template>
  <view class="container">
       <Navbar title="消息详情" />
   <u-row>
          <u-col span="12">
            <view class="time"> {{ formatDate(listData.createTime) }} </view>
          </u-col>
        </u-row>
        <view class="list-item">
          <view class="account">
            <view>{{listData.workOrderId}}</view>
          </view>
          <view class="record">
            <view>{{listData.handler}}</view>
            <view>{{listData.updater}}</view>
          </view>
          <u-divider ></u-divider>
         <u--text :text="listData.message"></u--text>
        </view>
  </view>
</template>

<script>
import uTabs from "../../uni_modules/uview-ui/components/u-tabs/u-tabs.vue";
import Navbar from "@/components/navbar/navbar";
import {getInformation} from "@/api/list.js"

export default {
  name:'messagedetail',
  components: { uTabs, Navbar },
  data() {
    return {    
      listData:{},
      form:{
        id:this.$route.query.id
      }
    };
  },
   onLoad() {
    this.getlist();
  },
  methods: {
     formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
   getlist(){
         getInformation( this.form).then((res) => {
           this.listData = res.data
      }); 
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