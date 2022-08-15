<template>
  <view class="container">
    <view class="content">
      <Navbar :title="langText.pageTitle" />
      <view class="box-card">
        <view class="report-form">
          <view class="tlt">
            <view class="report-form-tit">{{ langText.reportForm }}</view>
            <u-button
              class="report-form-button"
              type="primary"
              :text="langText.all"
              @click="loginOrJump('/pages/list/echartslist')"
            ></u-button>
          </view>
          <uni-table
            ref="table"
            width="360"
            border
            stripe
            emptyText="暂无更多数据"
          >
            <uni-tr>
              <uni-th class="name" width="100" align="center"
                >二级单位名称</uni-th
              >
              <uni-th class="name" width="80" align="center">系统公共</uni-th>
              <uni-th class="name" width="80" align="center">业务单据</uni-th>
              <uni-th class="name" width="80" align="center">财务核算</uni-th>
              <uni-th class="name" width="80" align="center">司库管理</uni-th>
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

              <uni-td align="center">{{ item.createTime }}</uni-td>
            </uni-tr>
          </uni-table>
        </view>
      </view>
      <view class="box-card">
        <view class="report-form">
          <view class="tlt">
            <view class="report-form-tit">{{ langText.view }}</view>
            <u-button
              class="report-form-button"
              type="primary"
              :text="langText.all"
              @click="loginOrJump('/pages/list/echartslist')"
            ></u-button>
          </view>
          <div class="myChart" ref="myChart"></div>
          <div class="myChart" ref="myChart1"></div>
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
    Tabbar,
  },
  data() {
    return {
      pageTitle: "IT服务运营平台",
      tableData: [
        {
          processInstance: {
            id: "二航局",
            name: "815",
            startUserNickname: "815",
          },
          suspensionState: "815",
          createTime: "815",
        },
        {
          processInstance: {
            id: "中国城乡",
            name: "121",
            startUserNickname: "121",
          },
          suspensionState: "121",
          createTime: "121",
        },
        {
          processInstance: {
            id: "二公院",
            name: "44",
            startUserNickname: "44",
          },
          suspensionState: "44",
          createTime: "44",
        },
        {
          processInstance: {
            id: "信科集团",
            name: "815",
            startUserNickname: "815",
          },
          suspensionState: "815",
          createTime: "815",
        },
        {
          processInstance: {
            id: "二航院",
            name: "121",
            startUserNickname: "121",
          },
          suspensionState: "121",
          createTime: "121",
        },
        {
          processInstance: {
            id: "中国港湾",
            name: "44",
            startUserNickname: "44",
          },
          suspensionState: "44",
          createTime: "44",
        },
      ],
      lastMsg: {
        show: true,
      },
    };
  },
  onLoad() {},
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
    msgDel() {
      this.lastMsg.show = false;
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
      const myChart = this.$echarts.init(this.$refs.myChart);
      myChart.setOption({
        series: [
          {
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: true,
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: true,
            },
            data: [
              { value: 50, name: "系统公共" },
              { value: 50, name: "业务单据" },
              { value: 50, name: "财务核算" },
              { value: 50, name: "司库管理" },
            ],
          },
        ],
      });
    },
    initEcharts1() {
      const myChart = this.$echarts.init(this.$refs.myChart1);
      myChart.setOption({
        xAxis: {
          type: "category",
          axisLabel: {
            //x轴文字的配置
            show: true,
            interval: 0, //使x轴文字显示全
          },
          data: [
            "二航局",
            "中国城乡",
            "二公院",
            "信科集团",
            "二航院",
            "中国港湾",
          ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110],
            type: "bar",
          },
        ],
      });
    },
  },

  mounted() {
    this.initEcharts();
    this.initEcharts1();
  },
};
</script>

<style  lang="scss" scoped>
.name {
  font-size: 12rpx;
}
.content {
  width: 719rpx;
  margin: 0 auto;
  background: #f1f4f5;

  overflow: hidden;
  border-radius: 21rpx;
  display: flex;
  flex-direction: column;
  .box-card {
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
        .report-form-button {
          width: 120rpx;
          height: 50rpx;
          font-size: 15pt;
          margin-right: 40rpx;
          font-family: PingFangSC-Regular, PingFang SC;
        }
      }
    }
  }
  .myChart {
    width: 360px;
    height: 400px;
    margin-left: -10rpx;
  }
  .myChart1 {
    width: 360px;
    height: 400px;
    margin-left: -10rpx;
  }
}
</style>