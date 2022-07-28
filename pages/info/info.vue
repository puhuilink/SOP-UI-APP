<template>
  <view class="container">
    <u-sticky bgColor="#fff">
      <u-tabs
        :list="msgState.list"
        :scrollable="false"
        :current="msgState.index"
        @change="changeMsgState"
        lineHeight="6rpx"
        lineWidth="58rpx"
        lineColor="#007EFD"
        itemStyle="height: 96rpx"
        inactiveStyle="color: #666666"
        activeStyle="color: #007EFD"
      />
      <view class="search-box">
        <u-search
          placeholder="请输入关键字"
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
    <u-list>
      <u-list-item v-for="(item, index) in listData" :key="index">
        <u-row>
          <u-col span="12">
            <view class="time"> {{ item.published_at }} </view>
          </u-col>
        </u-row>
        <view class="list-item">
          <view class="level1">{{ item.value }}</view>
          <view class="account">
            <view>{{item.title}}</view>
            <view>{{item.id}}</view>
          </view>
          <view class="record">
            <view>{{item.author_name}}</view>
            <view>{{item.name}}</view>
          </view>
        </view>
      </u-list-item>
    </u-list>
  </view>
</template>

<script>
import uTabs from "../../uni_modules/uview-ui/components/u-tabs/u-tabs.vue";
export default {
  components: { uTabs },
  data() {
    return {
      keyword: "",
      type: "warning",
      value: 100,
      msgState: {
        index: 0,
        list: [
          {
            name: "已读",
          },
          {
            name: "未读",
          },
        ],
      },
      listData: [
        {
          value: "P1",
          id: "S20220531199",
          title: "01-财务账号问题",
          author_name: "二线人员王明已处理",
          name: "记录人高得",
          published_at: "2022-07-22 08:19",
        },
        {
          value: "P2",
          id: "S20220531199",
          title: "02-财务账号问题",
          author_name: "二线人员王明已处理",
          name: "记录人李雷",
          published_at: "2022-07-23 08:19",
        },
        {
          value: "P3",
          id: "S20220531199",
          title: "03-财务账号问题",
          author_name: "二线人员王明已处理",
          name: "记录人王露",
          published_at: "2022-07-24 08:19",
        },
        {
          value: "P4",
          id: "S20220531199",
          title: "04-财务账号问题",
          author_name: "二线人员王明已处理",
          name: "记录人高得",
          published_at: "2022-07-25 08:19",
        },
      ],
    };
  },
  methods: {
    changeMsgState(item) {
      this.msgState.index = item.index;
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
  padding: 0 28rpx 30rpx;
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