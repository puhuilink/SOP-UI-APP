<template>
  <view v-if="!isWx" class="navbar-box">
    <view class="navbar">
      <u-icon name="arrow-left" color="#fff" size="38rpx" @click="goBack" />
      <view class="navbar-title">{{ title || "" }}</view>
    </view>
  </view>
</template>

<script>
export default {
  name: "navbar",
  props: ["title", "back"],
  data() {
    return {
      isWx: true,
    };
  },
  computed: {},
  created() {
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      //微信环境
      this.isWx = true;
    } else if (ua.match(/wxwork/i) == "wxwork") {
      //企业微信环境
      this.isWx = true;
    } else {
      //其他环境
      this.isWx = false;
    }
  },
  methods: {
    goBack() {
      if (this.back) {
        uni.navigateTo({
          url: this.back,
        });
      } else {
        uni.navigateBack({
          delta: 1,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar-box {
  height: 75rpx;
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    padding: 0 17rpx;
    box-sizing: border-box;
    height: 75rpx;
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 33rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    background: url(../../static/images/icon/head-bg.png) no-repeat;
    background-size: 100% auto;
    background-position: 0% 25%;

    .navbar-title {
      width: calc(100% - 76rpx);
      padding: 0 38rpx;
      box-sizing: border-box;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
