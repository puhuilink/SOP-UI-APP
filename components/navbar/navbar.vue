<template>
  <view class="navbar-box">
    <view class="navbar">
      <u-icon name="arrow-left" color="#fff" size="38rpx" @click="goBack" />
      <view>{{ title || "" }}</view>
      <view />
    </view>
  </view>
</template>

<script>
export default {
  name: "navbar",
  props: ["title", "back"],
  data() {
    return {};
  },
  computed: {},
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

    view {
      flex: 1;
      text-align: center;
    }
  }
}
</style>
