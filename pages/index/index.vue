<template>
  <view class="container">
    <view class="group9 flex-col">
      <view class="block3">
        <text class="word1">IT服务运营管理平台</text>
      </view>
      <view class="scroll-msg">
        <!--消息滚动栏-->
        <!-- <fui-card
          radius="5%"
          :padding="['20rpx', '32rpx']"
          src="../../static/images/icon/消息.png"
          title="工单"
          tag="上午11:30"
        >
          <view class="fui-card__content"
            >您有一个新的工单待接收，请及时处理</view
          >
        </fui-card> -->
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

    <u-gap height="30rpx" />
    <!--宫格菜单按钮-->
    <view class="menu">
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
    </view>
    <u-gap height="15rpx" />
  </view>
</template>

<script>
import { getList } from "@/api/index.js";
export default {
  name: "index",
  components: {},
  data() {
    return {
      form: {
        dirId: 79,
      },
      formId: {
        id: "",
      },
      menuList: [
        {
          icon: "../../static/images/icon/问题反馈.png",
          title: "财务云问题反馈",
        },
        {
          icon: "../../static/images/icon/相关申请.png",
          title: "财务云相关申请",
        },
        { icon: "../../static/images/icon/堡垒机.png", title: "堡垒机申请" },
        {
          icon: "../../static/images/icon/问题变更.png",
          title: "系统变更申请",
        },
        {
          icon: "../../static/images/icon/视频会议.png",
          title: "总部视频会议",
        },
        {
          icon: "../../static/images/icon/访问权限.png",
          title: "访问权限申请",
        },
      ],
      Listdata: [],
      noticeList: "您有一个新的工单待接收，请及时处理",
    };
  },
  onLoad() {},
  onLoad() {
    this.getList();
  },
  methods: {
    click(name) {
      //根据点击进行不同跳转
      if (name == 0) {
        wx.navigateTo({
          url: "/pages/info/info",
        });
      } else if (name == 1) {
        //路由跳转携带参数
        wx.navigateTo({
          url: "/pages/info/test",
        });
      } else if (name == 2) {
        wx.navigateTo({
          url: "/pages/info/info",
        });
      } else if (name == 3) {
        wx.navigateTo({
          url: "/pages/info/info",
        });
      } else if (name == 4) {
        wx.navigateTo({
          url: "/pages/info/info",
        });
      } else if (name == 5) {
        wx.navigateTo({
          url: "/pages/info/info",
        });
      }
    },
    async getList() {
      getList().then((res) => {
        this.Listdata = res.data.list;
        for (var i = 0; i < this.Listdata.length; i++) {
          this.menuList[i].title = this.Listdata[i].label;
        }
      });
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.group9 {
  height: 374rpx;
  background: url(../../static/images/icon/head-bg.png) no-repeat;
  background-size: 100% 100%;
  position: relative;
  size: 100%;
}
.block3 {
  height: 63rpx;
  font-size: 46rpx;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
  line-height: 63rpx;
  margin: 144rpx 33px 30rpx;
}
.word1 {
  font-size: 20px;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  line-height: 30px;
}

.scroll-msg {
  margin: 0 auto;
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
.menu {
  width: 719rpx;
  background: #ffffff;
  margin: 0 auto;
  padding: 30rpx 0 30rpx;
  box-sizing: border-box;
  border-radius: 21rpx;

  .title {
    padding-left: 36rpx;
    font-size: 31rpx;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #333333;
    line-height: 44rpx;
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
// .fui-card__content {
//   font-size: 28rpx;
//   padding: 32rpx 20rpx 10px 20px;
//   height: 14px;
//   font-size: 14px;
//   font-family: PingFangSC-Regular, PingFang SC;
//   font-weight: 400;
//   color: #68696d;
//   line-height: 14px;
// }
</style>
