<template>
  <view class="container">
       <Navbar title="消息" />
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
      <u-list-item v-for="(item, index) in listData" :key="index"  @click="loginOrJump('/pages/message/messagedetail')">
        <u-row>
          <u-col span="12">
            <view class="time"> {{ item.published_at }} </view>
          </u-col>
        </u-row>
        <view class="list-item" >
          <view class="account">
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
import Navbar from "@/components/navbar/navbar";
export default {
  components: { uTabs, Navbar },
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
          id: "S20220531199",
          title: "01-财务账号问题",
          author_name: "二线人员王明已处理",
          name: "记录人高得",
          published_at: "2022-07-22 08:19",
        },
        {
          id: "S20220531199",
          title: "02-财务账号问题",
          author_name: "二线人员王明已处理",
          name: "记录人李雷",
          published_at: "2022-07-23 08:19",
        },
        {
          id: "S20220531199",
          title: "03-财务账号问题",
          author_name: "二线人员王明已处理",
          name: "记录人王露",
          published_at: "2022-07-24 08:19",
        },
        {
          id: "S20220531199",
          title: "04-财务账号问题",
          author_name: "二线人员王明已处理",
          name: "记录人高得",
          published_at: "2022-07-25 08:19",
        },
      ],
    };
  },
     computed: {
    hasLogin() {
      return this.$store.getters.hasLogin;
    },
  },
  methods: {
     loginOrJump(pageUrl) {
      if (!pageUrl) return;
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