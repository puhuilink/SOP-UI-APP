<template>
  <view class="container">
    <view class="banner-tit">IT服务运营管理平台</view>

    <view class="content">
      <view v-if="lastMsg.show" class="scroll-msg" @click="msgDel">
        <img src="../../static/images/icon/消息.png" />
        <view class="msg-box">
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

      <!--宫格菜单按钮-->
      <scroll-view
        scroll-y
        class="menu"
        :style="{
          height: lastMsg.show ? 'calc(100% - 140rpx);' : '100%',
        }"
        @scrolltolower="scrolltolower"
      >
        <view class="title">自助工单</view>
        <u-grid :border="false" col="4" @click="click">
          <u-grid-item
            v-for="(item, index) in menuList"
            :key="index"
            class="menu-item"
          >
            <u-image :src="item.icon" width="96rpx" height="96rpx"> </u-image>
            <text class="grid-title">{{ item.title }}</text>
          </u-grid-item>
        </u-grid>
      </scroll-view>
    </view>

    <u-tabbar
      :value="tabarList.findIndex(item => (item.name === 'index'))"
      :fixed="true"
      :placeholder="false"
      :safeAreaInsetBottom="false"
      @change="change"
    >
      <block v-for="(item, index) in tabarList" :key="index">
        <u-tabbar-item
          :text="item.text"
          :icon="item.name === 'index' ? item.selectedIconPath : item.iconPath"
        ></u-tabbar-item>
      </block>
    </u-tabbar>
  </view>
</template>

<script>
import { getList, getByDir } from "@/api/index.js";
import { mapState } from "vuex";
export default {
  name: "index",
  components: {},
  data() {
    return {
      pageNo: 1,
      menuList: [],
      lastMsg: {
        show: true,
      },
    };
  },
  onLoad() {
    // 获取用户信息
    this.$store.dispatch("ObtainUserInfo");
    this.getList();
  },
  computed: {
    ...mapState(["tabarList"]),
  },
  methods: {
    change(name) {
      uni.navigateTo({
        url: this.tabarList[name].pagePath,
      });
    },
    click(name) {
      let dirId = this.menuList[name].id || "";
      getByDir({ dirId }).then((res) => {
        let { code, data = {} } = res;
        if (data && data.formId) {
          uni.navigateTo({
            url: `/pages/info/test?id=${data.formId}`,
          });
        }
      });
    },
    async getList() {
      await getList({ pageNo: this.pageNo, pageSize: 24 }).then((res) => {
        let { code, data = {}, msg } = res;
        // label替换为title
        if (parseInt(code) !== 0 && !data.list) {
          msg && uni.$u.toast(msg);
          return;
        }
        data.list = data.list.map((item) => {
          return {
            ...item,
            title: item.label,
          };
        });
        this.menuList = [...this.menuList, ...data.list];
        this.pageNo += 1
      });
    },
    msgDel() {
      this.lastMsg.show = false;
    },
    scrolltolower() {
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  background: url(../../static/images/icon/head-bg.png) no-repeat;
  background-size: 100% auto;
}
.banner-tit {
  font-size: 46rpx;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
  line-height: 63rpx;
  padding: 144rpx 33px 54rpx;
}

.content {
  width: 719rpx;
  margin: 0 auto;
  background: #f1f4f5;
  height: calc(100vh - 377rpx);
  overflow: hidden;
  border-radius: 21rpx;
  display: flex;
  flex-direction: column;

  .scroll-msg {
    width: 719rpx;
    height: 140rpx;
    margin: 0 auto 33rpx;
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

  .menu {
    width: 719rpx;
    background: #ffffff;
    margin: 0 auto;
    padding-bottom: 30rpx;
    box-sizing: border-box;
    border-radius: 21rpx;
    overflow: hidden;
    // height: calc(100% - 140rpx);

    .title {
      position: sticky;
      top: 0;
      z-index: 999;
      width: 100%;
      padding: 30rpx 36rpx 0;
      font-size: 31rpx;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #333333;
      line-height: 44rpx;
      background: #fff;
    }

    .u-grid {
      align-items: flex-start;
    }

    .menu-item {
      padding-top: 38rpx;

      .grid-title {
        margin-top: 10rpx;
        font-size: 25rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #737578;
        line-height: 35rpx;
        width: 100rpx;
        text-align: center;
      }
    }
  }
}
</style>
