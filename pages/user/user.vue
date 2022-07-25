<template>
  <view class="container">
    <view class="user-header">
      <view class="user-info" @click="loginOrJump('/pages/profile/profile')">
        <u-avatar size="80" :src="userInfo.avatar"></u-avatar>
        <text class="nick-name">{{ hasLogin ? userInfo.nickname || '游客' : '登录/注册' }}</text>
      </view>
    </view>

    <u-gap height="10" bgColor="#f3f3f3"></u-gap>
      <u-notice-bar :text="noticeList" mode="closable" speed="100"  ></u-notice-bar>
        <u-gap height="10" bgColor="#f3f3f3"></u-gap>
     
    
         <u-cell-group class="fun-list">
           <view class="order-header">
        <text class="order-title">我的工单</text>
      </view> 
      <u-cell class="fun-item" :border="false" icon="clock" title="我的待办" isLink></u-cell>
      <u-cell class="fun-item" :border="false" icon="checkmark-circle" title="我的已办" isLink></u-cell>
      <u-cell class="fun-item" :border="false" icon="email" title="我管理的" isLink></u-cell>
      <u-cell class="fun-item" :border="false" icon="chat" title="消息中心" @click="loginOrJump('/pages/address/list')" isLink></u-cell>
    </u-cell-group>
   <fui-card radius="5%" >
				<view class="fui-card__title">
				 宝剑锋从磨砺出，梅花香自苦寒来
				</view>
			</fui-card>

    <view v-if="hasLogin" class="logout-btn">
      <u-button type="error" color="#ea322b" text="退出登录" @click="logout"></u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      noticeList:'您有一个新的工单待接收，请及时处理',
      orderStatusList: [
        { icon: 'rmb-circle', title: '待支付' },
        { icon: 'car', title: '代发货' },
        { icon: 'order', title: '待收货' },
        { icon: 'integral', title: '已完成' }
      ],
      statList: [
        { value: '0', title: '我的收藏' },
        { value: '0', title: '我的消息' },
        { value: '0', title: '我的足迹' }
      ]
    }
  },
  onLoad() {
    if (this.hasLogin){
      this.$store.dispatch('ObtainUserInfo')
    }
  },
  methods: {
    loginOrJump(pageUrl) {
      if (!this.hasLogin) {
        uni.$u.route('/pages/login/social')
      } else {
        uni.$u.route(pageUrl)
      }
    },
    logout() {
      uni.showModal({
        title: '提示',
        content: '您确定要退出登录吗',
        success: res => {
          if (res.confirm) {
            this.$store.dispatch('Logout')
          } else if (res.cancel) {
            //console.log('用户点击取消')
          }
        }
      })
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    },
    hasLogin() {
      return this.$store.getters.hasLogin
    }
  }
}
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

.order-header {
  @include flex-space-between;
  padding: 20rpx 30rpx;
  border-bottom: $custom-border-style;

  .order-title {
    width: 60px;
height: 21px;
font-size: 15px;
font-family: PingFangSC-Semibold, PingFang SC;
font-weight: 600;
color: #333333;
line-height: 21px;
  }
  .see-all {
    height: 40rpx;
    @include flex-right;
    color: #666666;
    font-size: 26rpx;
  }
}

.order-status-box {
  padding: 40rpx 0;
}

.stat-box {
  padding: 20rpx 0;
}

.grid-title {
  line-height: 50rpx;
  font-size: 26rpx;
}

.grid-value {
  line-height: 50rpx;
  font-size: 36rpx;
  font-weight: 700;
  color: #2b85e4;
}

.fun-list {
  .fun-item {
font-size: 14px;
font-weight: 400;
color: #000000;
line-height: 14px;
    padding-top: 10rpx;
    padding-bottom: 10rpx;
    border-bottom: $custom-border-style;
  }
}

.logout-btn {
  margin: 60rpx auto 0;
  width: 400rpx;
}
</style>
