<template>
  <view class="container">
    <Navbar :title="langText.pageTitle" />
    <u-toast ref="uToast"></u-toast>
    <u-sticky bgColor="#fff" customNavHeight="0">
      <u-tabs :list="msgState.list" :scrollable="false" :current="msgState.index" @change="changeMsgState"
        lineHeight="6rpx" lineWidth="58rpx" lineColor="#007EFD" itemStyle="height: 96rpx" inactiveStyle="color: #666666"
        activeStyle="color: #007EFD" />
      <view class="search-box">
        <u-search placeholder="请输入关键字" bgColor="#fff" placeholderColor="#999999" :show-action="false"
          searchIconColor="#000" height="75rpx" shape="square" :inputStyle="{ padding: '0 30rpx' }" v-model="keyword"
          @change="search" @clickIcon="search" />
      </view>
    </u-sticky>
    <u-list>
      <u-list-item v-for="(item, index) in listData" :key="index" @click="godetail(item)">
        <u-row>
          <u-col span="12">
            <view class="time"></view>
          </u-col>
        </u-row>
        <view class="list-item">
          <u-row customStyle="margin-bottom: 10px">
            <u-col span="10">
              <view class="title-box">
                <view v-if="item.priority">
                  <u-tag :text="item.priority" :type="item.type" plain size="mini" class="tag">
                  </u-tag>
                </view>

                <view class="title">{{
                    msgState.index == 2 ? item.title : item.name
                }}</view>
              </view>
            </u-col>
            <u-col span="2">
              <u-button type="primary" v-if="msgState.index == 0 && item.claimTime == null" :plain="true"
                :hairline="true" shape="circle" text="签收" size="mini" @click="sign(item)"></u-button>
              <u-button type="success" v-if="msgState.index == 0 && item.claimTime !== null" :plain="true"
                :hairline="true" shape="circle" text="已签收" size="mini">
              </u-button>
            </u-col>
          </u-row>
          <view class="account">
            <view class="account-box">
              <view class="account-text">{{ item.handler }}</view>
            </view>
            <view class="account-box">
              <view class="account-text">{{
                  msgState.index == 2 ? item.recorder : item.processInstance.startUserNickname
              }}</view>
            </view>
          </view>
          <view class="record">
            <view>
              <img src="/static/images/icon/icon_dingdan.png" class="record-img" />
              {{ item.workOrderId }}
            </view>
            <view>
              <img src="/static/images/icon/icon_time.png" class="record-img" />
              {{ formatDate(item.createTime) }}
            </view>
          </view>
        </view>
      </u-list-item>
    </u-list>
  </view>
</template>

<script>
import uTabs from "../../uni_modules/uview-ui/components/u-tabs/u-tabs.vue";
import Navbar from "@/components/navbar/navbar";
import {
  getToDoList,
  getHaveDoList,
  getClaim,
  getManageList,
} from "@/api/list.js";
export default {
  components: { uTabs, Navbar },
  data () {
    return {
      keyword: "",
      loading: false,
      // 数据总量
      total: 0,
      typeArr: ["error", "warning", "primary", "sucesss"],
      msgState: {
        index: this.$route.query.type || 0,
        list: [
          {
            name: "待办",
            badge: {
              value: "",
            },
          },
          {
            name: "已办",
            badge: {
              value: "",
            },
          },
          {
            name: "我的工单",
            badge: {
              value: "",
            },
          },
        ],
      },
      listData: [],
    };
  },
  computed: {
    userInfo () {
      return this.$store.getters.userInfo;
    },
    hasLogin () {
      return this.$store.getters.hasLogin;
    },
    langText () {
      return this.$t("message");
    },
  },
  onLoad () {
    this.getlist();
  },
  methods: {
    formatDate (date) {
      return new Date(date).toLocaleDateString();
    },
    async getlist () {
      if (this.msgState.index == 0) {
        await getToDoList().then((res) => {
          this.listData = res.data.list;
          console.log(this.listData);
          //   this.listData.forEach((item,index) => {
          //   // 添加type属性，值为typeArr数组中的随机值
          //   item.type = this.typeArr[item.priority];
          // });
          this.msgState.list[this.msgState.index].badge.value = res.data.total;
        });
      } else if (this.msgState.index == 1) {
        await getHaveDoList().then((res) => {
          this.listData = res.data.list;
          //   this.listData.forEach((item,index) => {
          //   // 添加type属性，值为typeArr数组中的随机值
          //   item.type = this.typeArr[item.priority];
          // });
          this.msgState.list[this.msgState.index].badge.value = res.data.total;
        });
      } else {
        await getManageList().then((res) => {
          this.listData = res.data.list;
          //   this.listData.forEach((item,index) => {
          //   // 添加type属性，值为typeArr数组中的随机值
          //   item.type = this.typeArr[item.priority];
          // });
          this.msgState.list[this.msgState.index].badge.value = res.data.total;
        });
      }
    },
    loginOrJump (pageUrl) {
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
    changeMsgState (item) {
      this.msgState.index = item.index;
      this.getlist();
    },
    async sign (item) {
      await getClaim({ taskId: item.id }).then((res) => {
        if (res) {
          this.$refs.uToast.show({
            type: "success",
            message: "签收成功",
          });
          setTimeout(() => {
            this.loginOrJump(`/pages/list/orderDetail?id=${item.id}&index=${this.msgState.index}`);
          }, 2000);
        }
      });
    },
    godetail (item) {
      if (item.claimTime !== null) {
        this.loginOrJump(`/pages/list/orderDetail?id=${item.id}&index=${this.msgState.index}`);
      } else {
        this.$refs.uToast.show({
          type: "warning",
          message: "请先签收该工单即可查看详情",
        });
      }
    },
    search () {
      console.log(this.keyword);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding-left: 0px;
  padding-right: 0px;
  font-size: 12px;
}

.search-box {
  background: #f1f4f5;
  padding: 17rpx 15rpx 0;
}

.time {
  height: 25rpx;
  margin: 15rpx;
}

.u-list {
  height: calc(100vh - 300rpx) !important;
}

.list-item {
  margin: 0 auto;
  width: 719rpx;
  min-height: 165rpx;
  background: #ffffff;
  border-radius: 17rpx;
  padding: 10rpx 28rpx;
  box-sizing: border-box;

  .title-box {
    height: 22px;
    font-size: 16px;
    font-weight: bold;
    color: #333333;
    padding: 30rpx 0rpx;
    line-height: 22px;
    display: flex;

    .title {
      margin-left: 40rpx;
    }

    .tag {
      line-height: 22px;
    }
  }

  .account {
    height: 46rpx;
    line-height: 46rpx;
    font-size: 33rpx;
    color: #333333;
    display: flex;
    justify-content: space-between;

    .account-box {
      border: 1px solid #f3f4fb;
      background: #f3f4fb;
    }

    .account-text {
      font-size: 12px;
      font-weight: 400;
      color: #717477;
      line-height: 18px;
      display: flex;
    }
  }

  .record {
    margin-top: 23rpx;
    display: flex;
    justify-content: space-between;
    height: 29rpx;
    font-size: 29rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #717477;
    line-height: 29rpx;
    padding: 0rpx 0rpx 20rpx 0rpx;

    .record-img {
      margin-right: 10rpx;
    }
  }
}
</style>
