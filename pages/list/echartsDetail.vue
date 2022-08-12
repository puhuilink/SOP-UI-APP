<template>
  <view class="container">
     <view class="content">
        <Navbar :title="pageTitle" />
        <view class="box-card">
          <uni-data-select
        v-model="form.value"
        :localdata="range"
        @change="change"
        label="选择周期"
      ></uni-data-select>
        </view>
      <view class="box-card">
         <view class="report-form">
          <view class="tlt">
          <view class="report-form-tit">{{langText.reportForm}}</view>
         </view>
       	<uni-table ref="table" width="360"  border stripe  emptyText="暂无更多数据">
				<uni-tr>
					<uni-th class="name" width="100" align="center">二级单位名称</uni-th>
					<uni-th class="name" width="80" align="center">系统公共</uni-th>
					<uni-th class="name"  width="80"  align="center">业务单据</uni-th>
					<uni-th class="name"  width="80"  align="center">财务核算</uni-th>
          <uni-th class="name"   width="80" align="center">司库管理</uni-th>
				</uni-tr>
				<uni-tr v-for="(item, index) in tableData" :key="index">
					<uni-td align="center">{{ item.processInstance.id }}</uni-td>
					<uni-td align="center">
					{{ item.processInstance.name }}
					</uni-td>
          	<uni-td align="center">
					{{ item.suspensionState }}
					</uni-td>
          	<uni-td align="center">
					{{ item.processInstance.startUserNickname }}
					</uni-td>
        
				<uni-td align="center">{{item.createTime }}</uni-td>
				</uni-tr>
			</uni-table>
      </view>
     
      </view>
       <view class="box-card">
         <view class="report-form">
          <view class="tlt">
          <view class="report-form-tit">{{langText.view}}</view>
          <view class="report-form-select" v-show="type==2">
        <uni-data-select
        v-model="form.company"
        :localdata="company"
        placeholder="请选择单位"
        @change="change"
      ></uni-data-select>
      </view>
         </view>
      <div class="myChart" v-show="type==1" ref="myChart"></div>
      <div class="myChart1" v-show="type==2" ref="myChart1"></div>
      </view>
      </view>
      </view>
 
    <Tabbar indexBar="echarts" />
  </view>
</template>

<script>
import Navbar from "@/components/navbar/navbar";
import Tabbar from "@/components/tabbar/tabbar";
export default {
  name: "index",
 components: {
    Navbar,
    Tabbar
  },
  data() {
    return {
       
        form:{
          company:'',
           value: ''
        },
        range: [
          { value: 0, text: "一周" },
          { value: 1, text: "一个月" },
          { value: 2, text: "近三个月" },
        ],
        company: [
          { value: 0, text: "二航院" },
          { value: 1, text: "中国城乡" },
          { value: 2, text: "二公院" },
        ],
      pageTitle: this.$route.query.title || "",
      type: this.$route.query.type || "",
      tableData:[
        {
          processInstance:{
            id:'二航局',
            name:'815',
            startUserNickname:'815',
          },
          suspensionState:'815',
          createTime:'815'
        },
        {
          processInstance:{
            id:'中国城乡',
            name:'121',
            startUserNickname:'121',
          },
          suspensionState:'121',
          createTime:'121'
        },
        {
          processInstance:{
            id:'二公院',
            name:'44',
            startUserNickname:'44',
          },
          suspensionState:'44',
          createTime:'44'
        },
        {
          processInstance:{
            id:'信科集团',
            name:'815',
            startUserNickname:'815',
          },
          suspensionState:'815',
          createTime:'815'
        },
        {
          processInstance:{
            id:'二航院',
            name:'121',
            startUserNickname:'121',
          },
          suspensionState:'121',
          createTime:'121'
        },
        {
          processInstance:{
            id:'中国港湾',
            name:'44',
            startUserNickname:'44',
          },
          suspensionState:'44',
          createTime:'44'
        }
      ],
    };
  },
 	// watch:{
	// 		type: {
	// 			handler(newValue, oldValue) {
	// 	       if(newValue == 1){
  //          this.initEcharts()
  //           }else if(newValue == 2){
  //             this.initEcharts1()
  //           }
	// 			},
	// 			immediate: true,
	// 			deep: true
	// 		}
	// 	},
  computed: {
     userInfo() {
      return this.$store.getters.userInfo;
    },
    hasLogin() {
      return this.$store.getters.hasLogin;
    },
    langText() {
      return this.$t("echarts");
    },
  },
  methods: {
     change(e) {
        console.log("e:", e);
      },
      loginOrJump(pageUrl) {
      if (!this.hasLogin) {
        uni.navigateTo({
          url: "/pages/login/login",
        });
      } else if (pageUrl) {
        uni.navigateTo({
          url: pageUrl,
        });
      }
    },
    // 初始化echarts
    initEcharts() {
      const myChart =  this.$echarts.init(this.$refs.myChart);
      myChart.setOption({
         legend: {
    data: ['二航局', '中国城乡', '二公院', '信科集团', '二航院', '中国港湾']
  },
  xAxis: {
    type: 'category',
   axisLabel: {
            //x轴文字的配置
            show: true,
            interval: 0,//使x轴文字显示全
           },
    data: ['系统公共', '业务单据', '财务核算', '司库管理','税务管理']
  },
  yAxis: {
    type: 'value',
    max:800
  },
  series: [
    
    {
        name: '二航局',
      color: '#007EFD',
      data: [500, 500, 500, 500, 500, 500],
      type: 'bar'
    },
     {
       name: '中国城乡',
      color: '#AD65FF',
      data: [460, 460, 460, 460, 460, 460],
      type: 'bar'
    },
     {
        name: '二公院',
      color: '#FF6D6D',
      data: [430, 430, 430, 430, 430, 430],
      type: 'bar'
    },
     {
        name: '信科集团',
      color: '#FE883D',
      data: [400, 400, 400, 400, 400, 400],
      type: 'bar'
    },
     {
        name: '二航院',
      color: '#52BFA9',
      data: [380, 380, 380, 380, 380, 380],
      type: 'bar'
    },
     {
        name: '中国港湾',
      color: '#FED25C',
      data: [320, 320, 320, 320, 320, 320],
      type: 'bar'
    }
  ]
      })
      },
  initEcharts1() {
      const myChart =  this.$echarts.init(this.$refs.myChart1);
      myChart.setOption({
              legend: {
                textStyle: {
                  fontSize: '11'
                },
    data: ['操作问题','权限配置','系统Bug','影像扫描','影像上传','影像识别','业务咨询','功能缺失','场景不全','系统故障']
  },
  series: [
    {
      type: 'pie',
      radius: ['40%', '60%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 2
      },
     label : {
      normal : {
      formatter: '{c}',
      textStyle : {
      fontWeight : 'normal',
      fontSize : 15
      }
    }
   },
      labelLine: {
        show: true,
      },
      data: [
        { value: 50, name: '操作问题' ,label:{textStyle:{color:"#4F7BFF"}} },
        { value: 30, name: '权限配置' ,label:{textStyle:{color:"#FE883D "}} },
        { value: 22, name: '系统Bug'  ,label:{textStyle:{color:"#52BFA9 "}} },
        { value: 38, name: '影像扫描' ,label:{textStyle:{color:"#E8B428 "}} },
        { value: 45, name: '影像上传' ,label:{textStyle:{color:"#38CA63"}} },
        { value: 10, name: '影像识别' ,label:{textStyle:{color:"#65E0FF"}} },
        { value: 17, name: '业务咨询' ,label:{textStyle:{color:"#FF6DEB "}} },
        { value: 35, name: '功能缺失' ,label:{textStyle:{color:"#E22C2C "}} },
        { value: 23, name: '场景不全' ,label:{textStyle:{color:"#AD65FF"}} },
        { value: 29, name: '系统故障' ,label:{textStyle:{color:"#FF6D6D"}} },
      ]
    }
  ]
      })
      },

  },

  mounted () {
    this.initEcharts()
    this.initEcharts1()
  }
};
</script>

<style  lang="scss" scoped>
.name{
  font-size:12rpx;
}
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
    margin-bottom: 20rpx;
    font-size: 15pt;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #333333;
  }
  .report-form-select{
     height: 50rpx;
    font-size: 15pt;
    margin-right: 40rpx;
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
    	height: 500px;
      margin-left: -10rpx;
    }
}
  
</style>