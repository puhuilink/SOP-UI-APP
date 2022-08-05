<template>
  <view class="container">
    <view class="head">
      您好， <br />
      欢迎登录IT服务运营管理平台
    </view>
    <view class="form">
      <img src="../../static/images/login-logo.png" />
      <u--form labelPosition="top" :model="formData" :rules="rules" ref="form">
        <u-form-item label="用户名称" labelWidth="100">
          <u-input
            v-model="formData.username"
            clearable
            placeholder="请输入用户名"
          />
        </u-form-item>
        <u-form-item label="密码" prop="password" labelWidth="100">
          <u-input
            type="password"
            maxlength="16"
            v-model="formData.password"
            placeholder="请输入密码"
          />
        </u-form-item>
        <u-gap height="20rpx" />
        <u-checkbox-group v-model="remember">
          <u-checkbox name="username" label="记住账号" />
        </u-checkbox-group>
      </u--form>
      <u-button
        class="login-btn"
        type="primary"
        customStyle="margin-top: 54rpx"
        @click="login"
        >登 录</u-button
      >
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: "",
        password: "",
      },
      rules: {
        password: {
          type: "string",
          min: 4,
          max: 16,
          required: true,
          message: "密码长度4-16位密码",
          trigger: ["blur", "change"],
        },
      },
      remember: [],
    };
  },
  onLoad() {
    let username = localStorage.getItem("username") || "";
    if (username) {
      this.formData.username = username;
      this.remember = ["username"];
    }
  },
  onReady() {},
  methods: {
    login() {
      this.$store
        .dispatch("Login", { type: 0, data: this.formData })
        .then((res) => {
          uni.$u.toast("登录成功");
          if (this.remember.includes("username")) {
            localStorage.setItem("username", this.formData.username);
          }
          if (
            !this.remember.includes("username") &&
            localStorage.getItem("username")
          ) {
            localStorage.removeItem("username");
          }
          setTimeout(() => {
            uni.navigateTo({
              url: "/pages/index/index",
            });
          }, 300);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  position: relative;
}
.head {
  height: 374rpx;
  background: url(../../static/images/icon/head-bg.png) no-repeat;
  background-size: 100% 100%;
  font-size: 42rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 83rpx;
  padding: 129rpx 52rpx 0;
}
.form {
  background: #ffffff;
  border-radius: 40rpx 40rpx 0 0;
  height: calc(100vh - 324rpx);
  width: 100%;
  position: absolute;
  left: 0;
  top: 324rpx;
  padding: 79rpx 54rpx 0;
  box-sizing: border-box;

  img {
    display: block;
    margin: 0 auto 50rpx;
    height: 125rpx;
    width: auto;
  }

  .login-btn {
    margin: 0 54rpx;
    width: auto;
  }
}
</style>