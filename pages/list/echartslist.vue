<template>
  <view class="container">
      <Navbar :title="langText.pageTitle" />
    <view class="work-order">
      <view class="work-order-tit">{{ langText.firstTitle }}</view>
      <view
        class="work-order-item"
        @click="loginOrJump('')"
      >
        <view class="work-order-item-left">
          <img
            src="/static/images/icon/user/wait-done.png"
            class="work-order-item-icon"
          />
          <view class="work-order-item-tit">{{ langText.firstTitleOrderTotal }}</view>
        </view>
        <u-icon name="arrow-right" />
      </view>
      <view
        class="work-order-item"
        @click="loginOrJump('')"
      >
        <view class="work-order-item-left">
          <img
            src="/static/images/icon/user/done.png"
            class="work-order-item-icon"
          />
          <view class="work-order-item-tit">{{ langText.firstTitleOrderDone }}</view>
        </view>
        <u-icon name="arrow-right" />
      </view>
      <view class="work-order-item" @click="loginOrJump('')">
        <view class="work-order-item-left">
          <img
            src="/static/images/icon/user/administration.png"
            class="work-order-item-icon"
          />
          <view class="work-order-item-tit">{{ langText.firstTitleOrderUndone }}</view>
        </view>
        <u-icon name="arrow-right" />
      </view>
    </view>
     <view class="work-order">
      <view class="work-order-tit">{{ langText.secondTitle }}</view>
      <view
        class="work-order-item"
        @click="loginOrJump('')"
      >
        <view class="work-order-item-left">
          <img
            src="/static/images/icon/user/wait-done.png"
            class="work-order-item-icon"
          />
          <view class="work-order-item-tit">{{ langText.secondTitleOrderTotal }}</view>
        </view>
        <u-icon name="arrow-right" />
      </view>
      <view
        class="work-order-item"
        @click="loginOrJump('')"
      >
        <view class="work-order-item-left">
          <img
            src="/static/images/icon/user/done.png"
            class="work-order-item-icon"
          />
          <view class="work-order-item-tit">{{ langText.secondTitleOrderDone }}</view>
        </view>
        <u-icon name="arrow-right" />
      </view>
      <view class="work-order-item" @click="loginOrJump('')">
        <view class="work-order-item-left">
          <img
            src="/static/images/icon/user/administration.png"
            class="work-order-item-icon"
          />
          <view class="work-order-item-tit">{{ langText.secondTitleOrderUndone }}</view>
        </view>
        <u-icon name="arrow-right" />
      </view>
    </view>
     <view class="work-order">
      <view class="work-order-tit">{{ langText.thirdTitle }}</view>
      <view
        class="work-order-item"
        @click="loginOrJump('')"
      >
        <view class="work-order-item-left">
          <img
            src="/static/images/icon/user/wait-done.png"
            class="work-order-item-icon"
          />
          <view class="work-order-item-tit">{{ langText.thirdTitleOrderTotal }}</view>
        </view>
        <u-icon name="arrow-right" />
      </view>
      <view
        class="work-order-item"
        @click="loginOrJump('')"
      >
        <view class="work-order-item-left">
          <img
            src="/static/images/icon/user/done.png"
            class="work-order-item-icon"
          />
          <view class="work-order-item-tit">{{ langText.thirdTitleOrderDone }}</view>
        </view>
        <u-icon name="arrow-right" />
      </view>
      <view class="work-order-item" @click="loginOrJump('')">
        <view class="work-order-item-left">
          <img
            src="/static/images/icon/user/administration.png"
            class="work-order-item-icon"
          />
          <view class="work-order-item-tit">{{ langText.thirdTitleOrderUndone }}</view>
        </view>
        <u-icon name="arrow-right" />
      </view>
    </view>
       <view class="work-order">
      <view class="work-order-tit">{{ langText.fourthTitle }}</view>
      <view
        class="work-order-item"
        @click="loginOrJump('')"
      >
        <view class="work-order-item-left">
          <img
            src="/static/images/icon/user/wait-done.png"
            class="work-order-item-icon"
          />
          <view class="work-order-item-tit">{{ langText.fourthTitleOrderTotal }}</view>
        </view>
        <u-icon name="arrow-right" />
      </view>
      <view
        class="work-order-item"
        @click="loginOrJump('')"
      >
        <view class="work-order-item-left">
          <img
            src="/static/images/icon/user/done.png"
            class="work-order-item-icon"
          />
          <view class="work-order-item-tit">{{ langText.fourthTitleOrderDone }}</view>
        </view>
        <u-icon name="arrow-right" />
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex";
import Navbar from "@/components/navbar/navbar";
export default {
   components: {
    Navbar
  },
  data() {
    return {
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
    langText() {
      return this.$t("echartslist");
    },
  },
  onLoad() {},
  created() {},
  methods: {
    change(name) {
      uni.navigateTo({
        url: this.tabarList[name].pagePath,
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
  },
};
</script>

<style lang="scss" scoped>

.work-order {
  width: 719rpx;
  background: #ffffff;
  border-radius: 21rpx;
  margin: 30rpx auto;

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
</style>
