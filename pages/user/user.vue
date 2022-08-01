<template>
  <view class="container">
    <view class="user-header">
      <view class="user-info" @click="loginOrJump('/pages/profile/profile')">
        <u-avatar size="80" :src="userInfo.avatar"></u-avatar>
        <text class="nick-name">{{
          hasLogin ? userInfo.nickname || "用户" : "登录/注册"
        }}</text>
      </view>
    </view>

    <u-gap height="10" bgColor="#f3f3f3"></u-gap>
    <u-notice-bar :text="noticeList" mode="closable" speed="100"></u-notice-bar>
    <u-gap height="10" bgColor="#f3f3f3"></u-gap>
    
    <view class="work-order">
      <view class="work-order-tit">我的工单</view>
      <view class="work-order-item" @click="loginOrJump('/pages/list/Todolist')">
        <view class="work-order-item-left">
          <img
            src="/static/images/icon/user/wait-done.png"
            class="work-order-item-icon"
          />
          <view class="work-order-item-tit">我的待办</view>
        </view>
        <u-icon name="arrow-right" />
      </view>
      <view class="work-order-item" @click="loginOrJump('/pages/list/Havedolist')">
        <view class="work-order-item-left">
          <img
            src="/static/images/icon/user/done.png"
            class="work-order-item-icon"
          />
          <view class="work-order-item-tit">我的已办</view>
        </view>
        <u-icon name="arrow-right" />
      </view>
      <view class="work-order-item" @click="loginOrJump('')">
        <view class="work-order-item-left">
          <img
            src="/static/images/icon/user/administration.png"
            class="work-order-item-icon"
          />
          <view class="work-order-item-tit">我管理的</view>
        </view>
        <u-icon name="arrow-right" />
      </view>
      <view class="work-order-item" @click="loginOrJump('/pages/address/list')">
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

    <view v-if="hasLogin" class="logout-btn">
      <u-button
        type="error"
        color="#ea322b"
        text="退出登录"
        @click="logout"
      ></u-button>
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
      form: {
        pageNo: 1,
        pageSize: 10,
      },
      statList: [
        { value: "0", title: "我的收藏" },
        { value: "0", title: "我的消息" },
        { value: "0", title: "我的足迹" },
      ],
    };
  },
  onLoad() {
    if (this.hasLogin) {
      this.$store.dispatch("ObtainUserInfo");
    }
  },
  created() {
    this.getToDoList();
  },
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
    logout() {
      uni.showModal({
        title: "提示",
        content: "您确定要退出登录吗",
        success: (res) => {
          if (res.confirm) {
            this.$store.dispatch("Logout");
          } else if (res.cancel) {
            //console.log('用户点击取消')
          }
        },
      });
    },
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    },
    hasLogin() {
      return this.$store.getters.hasLogin;
    },
  },
};
</script>

<style lang="scss" scoped>
.user-header {
  @include flex-center(column);
  height: 280rpx;
  .user-info {
    @include flex-center(column);
    .nick-name {
      margin-top: 20rpx;
      font-size: 32rpx;
      font-weight: 700;
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
