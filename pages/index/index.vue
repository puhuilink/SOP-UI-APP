<template>
  <view class="container">
    <view class="head">
      <view class="head-title">{{ langText.systemName }}</view>
      <view class="msg-set">
        <view class="msg-num" @click="loginOrJump('/pages/message/message')">
          <u-icon name="bell-fill" color="#fff" size="48rpx" />
          <view class="num" v-if="msgNum > 0">{{
            msgNum > 9 ? "···" : msgNum
          }}</view>
        </view>
        <u-icon
          name="setting-fill"
          color="#fff"
          size="48rpx"
          @click="loginOrJump('/pages/profile/profile')"
        />
      </view>
    </view>
    <view class="modular-box work-order">
      <view class="title">{{ langText.myWorkOder }}</view>
      <u-grid :border="false" col="4">
        <u-grid-item
          class="order-item"
          @click="loginOrJump('/pages/list/Todolist')"
        >
          <u-image
            src="@/static/images/index/todoOrder.png"
            width="96rpx"
            height="96rpx"
          />
          <text class="grid-title">{{ langText.todoOrder }}</text>
        </u-grid-item>
        <u-grid-item
          class="order-item"
          @click="loginOrJump('/pages/list/Havedolist')"
        >
          <u-image
            src="@/static/images/index/havedoOrder.png"
            width="96rpx"
            height="96rpx"
          />
          <text class="grid-title">{{ langText.havedoOrder }}</text>
        </u-grid-item>
        <u-grid-item class="order-item" @click="loginOrJump('')">
          <u-image
            src="@/static/images/index/manageOrder.png"
            width="96rpx"
            height="96rpx"
          />
          <text class="grid-title">{{ langText.manageOrder }}</text>
        </u-grid-item>
      </u-grid>
    </view>
    <u-gap height="20rpx" />
    <view class="modular-box work-order">
      <view class="title">{{ langText.customOrder }}</view>
      <u-grid :border="false" col="4" @click="click">
        <u-grid-item
          v-for="(item, index) in menuList"
          :key="index"
          class="order-item"
        >
          <u-image :src="item.icon" width="96rpx" height="96rpx" />
          <text class="grid-title">{{ item.title }}</text>
        </u-grid-item>
      </u-grid>
    </view>
    <u-gap height="20rpx" />
    <view class="modular-box" @click="loginOrJump('/pages/index/echarts')">
      <view class="title">{{ langText.reportManage }}</view>
      <view class="report">
        <view class="report-title">单位报表</view>
        <view class="report-item">
          <text>上线单位工单总量</text>
          <u-icon name="arrow-right" color="#737578" size="25rpx" />
        </view>
        <view class="report-item">
          <text>上线单位已处理工单总量</text>
          <u-icon name="arrow-right" color="#737578" size="25rpx" />
        </view>
        <view class="report-item">
          <text>上线单位未处理工单总量</text>
          <u-icon name="arrow-right" color="#737578" size="25rpx" />
        </view>
      </view>
      <view class="report">
        <view class="report-title">未处理工单</view>
        <view class="report-item">
          <text>超 48 小时未处理工单</text>
          <u-icon name="arrow-right" color="#737578" size="25rpx" />
        </view>
        <view class="report-item">
          <text>系统Bug未处理工单</text>
          <u-icon name="arrow-right" color="#737578" size="25rpx" />
        </view>
        <view class="report-item">
          <text>系统需求未处理工单</text>
          <u-icon name="arrow-right" color="#737578" size="25rpx" />
        </view>
      </view>
      <view class="report">
        <view class="report-title">财务核算</view>
        <view class="report-item">
          <text>固定资产模块</text>
          <u-icon name="arrow-right" color="#737578" size="25rpx" />
        </view>
        <view class="report-item">
          <text>债权债务模块</text>
          <u-icon name="arrow-right" color="#737578" size="25rpx" />
        </view>
      </view>
    </view>
    <u-gap height="110rpx" />

    <Tabbar indexBar="index" />
  </view>
</template>

<script>
import { getList, getByDir } from "@/api/index.js";
import Tabbar from "@/components/tabbar/tabbar";
export default {
  name: "index",
  components: {
    Tabbar,
  },
  data() {
    return {
      msgNum: 0,
      isScrolltolower: false,
      pageNo: 1,
      menuList: [],
      lastMsg: {
        show: true,
      },
    };
  },
  onLoad() {
    this.getList();
    // 获取用户信息
    this.$store.dispatch("ObtainUserInfo");
  },
  computed: {
    hasLogin() {
      return this.$store.getters.hasLogin;
    },
    langText() {
      return this.$t("index");
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
    click(name) {
      let dirId = this.menuList[name].id || "";
      let title = this.menuList[name].title || "";
      getByDir({ dirId }).then((res) => {
        let { code, data = {} } = res;
        if (data && data.formId) {
          uni.navigateTo({
            url: `/pages/info/formsubmit?id=${data.formId}&title=${title}`,
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
      });
      this.pageNo += 1;
      if (this.isScrolltolower) {
        this.isScrolltolower = false;
      }
    },
    msgDel() {
      this.lastMsg.show = false;
    },
    scrolltolower() {
      if (this.isScrolltolower) return;
      this.isScrolltolower = true;
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

.head {
  display: flex;
  justify-content: space-between;
  padding: 144rpx 30px 25rpx;

  .head-title {
    font-size: 46rpx;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
    line-height: 63rpx;
    width: 444rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .msg-set {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .u-icon:last-child {
      margin-left: 40rpx;
    }

    .msg-num {
      display: inline-block;
      position: relative;

      .num {
        position: absolute;
        top: -20rpx;
        right: -18rpx;
        width: 36rpx;
        line-height: 36rpx;
        border-radius: 18rpx;
        color: #fff;
        background: #ff0000;
        letter-spacing: -6rpx;
        text-align: center;
        font-size: 25rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        text-indent: -6rpx;
      }
    }
  }
}

.modular-box {
  width: 719rpx;
  background: #ffffff;
  margin: 0 auto;
  padding: 30rpx 0;
  box-sizing: border-box;
  border-radius: 21rpx;

  .title {
    padding: 0 36rpx;
    font-size: 31rpx;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #333333;
    line-height: 44rpx;
  }
}

.work-order {
  .u-grid {
    align-items: flex-start;
  }

  .order-item {
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

.report {
  padding: 0 36rpx;

  .report-title,
  .report-item {
    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
  }

  .report-title {
    margin: 38rpx 0 25rpx;
    font-weight: 600;
    color: #333333;
    line-height: 28px;
  }

  .report-item {
    height: 92rpx;
    font-weight: 400;
    color: #4a4a4a;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.report:first-child {
  margin-top: 8rpx;
}
</style>
