<template>
  <view class="container">
    <view class="user-header">
      <view>
        <u-avatar size="120rpx" :src="userInfo.avatar" />
        <view class="nick-name">
          <view>{{ index.userName }}</view>
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
    <view v-if="lastMsg.show" class="scroll-msg" @click="msgDel">
      <img src="../../static/images/icon/消息.png" />
      <view class="msg-box">
        <view class="tlt">
          <view>
         {{ index.order }}
            <view class="remind" />
          </view>
          <view class="time">上午11:30</view>
        </view>
        <view class="msg">您有一个新的工单待接收，请及时处理</view>
      </view>
    </view>

    <view class="work-order">
      <view class="work-order-tit">{{ index.workOrder }}</view>
      <view
        class="work-order-item"
        @click="loginOrJump('/pages/list/Todolist')"
      >
        <view class="work-order-item-left">
          <img
            src="/static/images/icon/user/wait-done.png"
            class="work-order-item-icon"
          />
          <view class="work-order-item-tit">{{ index.toDo }}</view>
        </view>
        <u-icon name="arrow-right" />
      </view>
      <view
        class="work-order-item"
        @click="loginOrJump('/pages/list/Havedolist')"
      >
        <view class="work-order-item-left">
          <img
            src="/static/images/icon/user/done.png"
            class="work-order-item-icon"
          />
          <view class="work-order-item-tit">{{ index.haveDo }}</view>
        </view>
        <u-icon name="arrow-right" />
      </view>
      <view class="work-order-item" @click="loginOrJump('')">
        <view class="work-order-item-left">
          <img
            src="/static/images/icon/user/administration.png"
            class="work-order-item-icon"
          />
          <view class="work-order-item-tit">{{ index.myManage }}</view>
        </view>
        <u-icon name="arrow-right" />
      </view>
      <view class="work-order-item" @click="loginOrJump('/pages/info/info')">
        <view class="work-order-item-left">
          <img
            src="/static/images/icon/user/message.png"
            class="work-order-item-icon"
          />
          <view class="work-order-item-tit">{{ index.messageCenter }}</view>
        </view>
        <u-icon name="arrow-right" />
      </view>
    </view>
    <u-gap height="60rpx" />
    <!--国际化切换按钮测试-->
    <view class="work-order">
      <view class="work-order-tit">{{ index.text }}</view>
      <u-tabs :scrollable="false" :list="list" @click="changeLanguage"></u-tabs>
    </view>
    <u-tabbar
      :value="tabarList.findIndex(item => (item.name === 'user'))"
      :fixed="true"
      :placeholder="false"
      :safeAreaInsetBottom="false"
      @change="change"
    >
      <block v-for="(item, index) in tabarList" :key="index">
        <u-tabbar-item
          :text="item.text"
          :icon="item.name === 'user' ? item.selectedIconPath : item.iconPath"
        ></u-tabbar-item>
      </block>
    </u-tabbar>
  </view>
</template>

<script>
import { getToDoList } from "@/api/list.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      list: [
        {
          name: "中文",
        },
        {
          name: "英文",
        },
      ],
      lastMsg: {
        show: true,
      },
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    },
    hasLogin() {
      return this.$store.getters.hasLogin;
    },
    ...mapState(["tabarList"]),
    index() {
      return this.$t("index");
    },
  },
  onLoad() {},
  created() {},
  methods: {
    changeLanguage(item) {
      if (item.name == "中文") {
        this._i18n.locale = "zh-CN";
        let count = this.$t("lang") === "zh" ? 1 : 2;
        // this.$store.commit('setLang', count)
        localStorage.setItem("language", count);
      } else {
        this._i18n.locale = "en-US";
        let count = this.$t("lang") === "zh" ? 1 : 2;
        localStorage.setItem("language", count);
      }
    },
    change(name) {
      uni.navigateTo({
        url: this.tabarList[name].pagePath,
      });
    },
    getToDoList() {
      getToDoList(this.form).then((res) => {
        console.log(res);
      });
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
    msgDel() {
      this.lastMsg.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  background: url(../../static/images/icon/head-bg.png) no-repeat;
  background-size: 100% auto;
}
.user-header {
  height: 120rpx;
  padding: 104rpx 50rpx 35rpx;
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
  margin: 0 auto 33rpx;
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
