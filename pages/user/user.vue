<template>
  <view class="container">
    <view class="user-header">
      <view class="user-info">
        <view>
          <u-avatar size="120rpx" :src="userInfo.avatar" />
          <view class="nick-name">
            <view>用户名</view>
            <view>{{ userInfo.nickname || "********" }}</view>
          </view>
        </view>
        <u-icon
          name="setting"
          color="#fff"
          size="42rpx"
          @click="loginOrJump('/pages/profile/profile')"
        />
      </view>
      <view class="scroll-msg">
        <img src="../../static/images/icon/消息.png" />
        <view class="content">
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
    </view>

    <!-- <u-gap height="10" bgColor="#f3f3f3"></u-gap>
    <u-notice-bar :text="noticeList" mode="closable" speed="100"></u-notice-bar>
    <u-gap height="10" bgColor="#f3f3f3"></u-gap> -->
    <u-gap height="60rpx" />

    <view class="work-order">
      <view class="work-order-tit">我的工单</view>
      <view
        class="work-order-item"
        @click="loginOrJump('/pages/list/Todolist')"
      >
        <view class="work-order-item-left">
          <img
            src="/static/images/icon/user/wait-done.png"
            class="work-order-item-icon"
          />
          <view class="work-order-item-tit">我的待办</view>
        </view>
        <u-icon name="arrow-right" />
      </view>
      <view class="work-order-item" @click="loginOrJump('/pages/list/Todolist')">
        <view class="work-order-item-left">
          <img
            src="/static/images/icon/user/done.png"
            class="work-order-item-icon"
          />
          <view class="work-order-item-tit">我的已办</view>
        </view>
        <u-icon name="arrow-right" />
      </view>
      <view class="work-order-item" @click="loginOrJump('/pages/list/Todolist')">
        <view class="work-order-item-left">
          <img
            src="/static/images/icon/user/administration.png"
            class="work-order-item-icon"
          />
          <view class="work-order-item-tit">我管理的</view>
        </view>
        <u-icon name="arrow-right" />
      </view>
      <view class="work-order-item" @click="loginOrJump('/pages/info/info')">
        <view class="work-order-item-left">
          <img
            src="/static/images/icon/user/message.png"
            class="work-order-item-icon"
          />
          <view class="work-order-item-tit">消息中心</view>
        </view>
        <u-icon name="arrow-right" />
      </view>
    </view>
  </view>
</template>

<script>
import { getToDoList } from "@/api/list.js";
export default {
  data() {
    return {
      noticeList: "您有一个新的工单待接收，请及时处理",
      orderStatusList: [
        { icon: "rmb-circle", title: "待支付" },
        { icon: "car", title: "代发货" },
        { icon: "order", title: "待收货" },
        { icon: "integral", title: "已完成" },
      ],
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    },
    hasLogin() {
      return this.$store.getters.hasLogin;
    },
  },
  onLoad() {
    if (this.hasLogin) {
      this.$store.dispatch("ObtainUserInfo");
    }
  },
  created() {},
  methods: {
    getToDoList() {
      getToDoList(this.form).then((res) => {
        console.log(res);
      });
    },
    loginOrJump(pageUrl) {
      if (!this.hasLogin) {
        uni.$u.route("/pages/login/login");
      } else if (pageUrl) {
        uni.$u.route(pageUrl);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.user-header {
  height: 374rpx;
  background: url(../../static/images/icon/head-bg.png) no-repeat;
  background-size: 100% 100%;
  position: relative;
  size: 100%;
  padding-top: 1px;
  .user-info {
    height: 120rpx;
    margin: 104rpx 50rpx 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > view {
      display: flex;
    }
    .nick-name {
      margin-left: 20rpx;
      font-size: 33rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;

      > view {
        height: 60rpx;
        display: flex;
        align-items: center;
      }
    }
  }

  .scroll-msg {
    position: absolute;
    top: 263rpx;
    left: 50%;
    margin-left: -360rpx;
    width: 719rpx;
    min-height: 140rpx;
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

    .content {
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
}

.work-order {
  width: 719rpx;
  background: #ffffff;
  border-radius: 21rpx;
  margin: 0 auto;

  .work-order-tit {
    line-height: 102rpx;
    padding: 0 30rpx;
    font-size: 31rpx;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #333333;
  }

  .work-order-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 92rpx;
    padding: 0 30rpx;
    font-size: 29rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #000000;

    .work-order-item-left {
      display: flex;
      .work-order-item-tit {
        margin-left: 15rpx;
      }
    }

    .work-order-item-icon {
      width: 38rpx;
      height: 38rpx;
      display: block;
    }

    .u-icon {
      color: #000000 !important;
    }
  }
}

.logout-btn {
  margin: 60rpx auto 0;
  width: 400rpx;
}
</style>
