<template>
  <view class="container">
     <view class="content">
        <Navbar :title="pageTitle" />
     <view v-if="lastMsg.show" class="scroll-msg" @click="msgDel">
        <img src="../../static/images/icon/消息.png" />
        <view class="msg-box">
          <view class="tlt">
            <view>
              工单
              <view class="remind" />
            </view>
            <view class="time">上午11:30</view>
          </view>
          <view class="msg">您有一个新的工单待接收，请及时处理</view>
        </view>
      </view>
       <view class="box-card">
         <view class="report-form">
          <view class="tlt">
          <view class="report-form-tit">视图</view>
         <u-button class="report-form-button" type="primary" text="全部"></u-button>
         </view>
      <div class="myChart" ref="myChart"></div>
      <div class="myChart" ref="myChart1"></div>
      </view>
      </view>
      </view>
 
    <u-tabbar
      :value="tabarList.findIndex(item => (item.name === 'echarts'))"
      :fixed="true"
      :placeholder="false"
      :safeAreaInsetBottom="false"
      @change="change"
    >
      <block v-for="(item, index) in tabarList" :key="index">
        <u-tabbar-item
          :text="item.text"
          :icon="item.name === 'echarts' ? item.selectedIconPath : item.iconPath"
        ></u-tabbar-item>
      </block>
    </u-tabbar>
  </view>
</template>

<script>
import Navbar from "@/components/navbar/navbar";
import { mapState } from "vuex";
export default {
  name: "index",
 components: {
    Navbar
  },
  data() {
    return {
      pageTitle:'IT服务运营管理平台',
         lastMsg: {
        show: true,
      },
    };
  },
  onLoad() {},
  computed: {
    ...mapState(["tabarList"]),
  },
  methods: {
    change(name) {
      uni.navigateTo({
        url: this.tabarList[name].pagePath,
      });
    },
      msgDel() {
      this.lastMsg.show = false;
    },
    // 初始化echarts
    initEcharts() {
      const myChart =  this.$echarts.init(this.$refs.myChart);
      myChart.setOption({
  series: [
    
    {
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: true,
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '40',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: true,
      },
      data: [
        { value: 50, name: '名称1' },
        { value: 50, name: '名称2' },
        { value: 50, name: '名称3' },
        { value: 50, name: '名称4' }
      ]
    }
  ]
      });
    },
    initEcharts1() {
      const myChart =  this.$echarts.init(this.$refs.myChart1);
      myChart.setOption({
  xAxis: {
    type: 'category',
    data: ['名称1', '名称2', '名称3', '名称4', '名称5', '名称6']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110],
      type: 'bar'
    }
  ]
      })
      }

  },

  mounted () {
    this.initEcharts()
    this.initEcharts1()
  }
};
</script>

<style  lang="scss" scoped>
.content {
  width: 719rpx;
  margin: 0 auto;
  background: #f1f4f5;

  overflow: hidden;
  border-radius: 21rpx;
  display: flex;
  flex-direction: column;
 .scroll-msg {
    width: 719rpx;
    height: 140rpx;
    margin: 33rpx auto 33rpx;
    background: #ffffff;
    border-radius: 21rpx;
    display: flex;
    padding: 30rpx;
    box-sizing: border-box;

    img {
      display: block;
      width: 80rpx;
      height: 80rpx;
      margin-right: 21rpx;
    }

    .msg-box {
      flex: 1;
      .tlt {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 29rpx;
        font-size: 29rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #111111;
        margin-bottom: 19rpx;

        view {
          display: flex;
          align-items: center;
          .remind {
            width: 16rpx;
            height: 16rpx;
            background: #ff0000;
            margin-left: 10rpx;
            border-radius: 8rpx;
          }
        }

        .time {
          font-size: 25rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #a6a6a8;
        }
      }

      .msg {
        height: 29rpx;
        font-size: 29rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #68696d;
        line-height: 29rpx;
      }
    }
  }
  .box-card{
      width: 719rpx;
    margin: 0 auto 33rpx;
    background: #ffffff;
    border-radius: 21rpx;
    display: flex;
    box-sizing: border-box;

.report-form {
  width: 719rpx;
  background: #ffffff;
  border-radius: 21rpx;
  margin: 0 auto;
 .tlt {
        display: flex;
        justify-content: space-between;
        align-items: center;

        font-family: PingFangSC-Medium, PingFang SC;
        margin-bottom: 19rpx;
        margin-top: 19rpx;
.report-form-tit {
   width: 120rpx;
  height: 50rpx;
    padding: 0 30rpx;
    font-size: 15pt;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #333333;
  }
  .report-form-button{
    width: 120rpx;
     height: 50rpx;
    font-size: 15pt;
    margin-right: 50rpx;
    font-family: PingFangSC-Regular, PingFang SC;
  }
 }
  }
  }
    .myChart{
        width: 360px;
    	height: 400px;
      margin-left: -10rpx;
    }
    .myChart1{
        width: 360px;
    	height: 400px;
      margin-left: -10rpx;
    }
}
  
</style>