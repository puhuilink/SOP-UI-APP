<template>
  <u-tabbar
    :value="tabarList.findIndex((item) => item.name === indexBar2)"
    :fixed="true"
    :placeholder="false"
    :safeAreaInsetBottom="false"
    @change="change"
  >
    <block v-for="(item, index) in tabarList" :key="index">
      <u-tabbar-item
        :text="item.text"
        :icon="item.name === indexBar2 ? item.selectedIconPath : item.iconPath"
      ></u-tabbar-item>
      <!-- 拨打电话 -->
      <u-overlay :opacity="0.3" :show="!!(indexBar2 === 'serviceTel')">
        <view class="tel-Box">
          <view class="tel">
            <text>客服电话</text>
            <text>400-676-5885</text>
            <view class="tel-btn">
              <view @click="callTel()">取消</view>
              <view @click="callTel(true)">拨打</view>
            </view>
          </view>
        </view>
      </u-overlay>
    </block>
  </u-tabbar>
</template>

<script>
export default {
  name: "tabbar",
  props: ["indexBar"],
  data() {
    return {
      indexBar2: "",
      tabbar: [
        {
          name: "index",
          pagePath: "/pages/index/index",
          iconPath: "/static/images/tabbar/index.png",
          selectedIconPath: "/static/images/tabbar/index-active.png",
        },
        {
          name: "customerService",
          pagePath: "/pages/customerService/customerService",
          iconPath: "/static/images/tabbar/customer-service.png",
          selectedIconPath: "/static/images/tabbar/customer-service-active.png",
        },
        {
          name: "serviceTel",
          pagePath: "",
          iconPath: "/static/images/tabbar/service-tel.png",
          selectedIconPath: "/static/images/tabbar/service-tel-active.png",
          tel: "400-676-5885",
        },
        {
          name: "problems",
          pagePath: "/pages/problems/problems",
          iconPath: "/static/images/tabbar/problems.png",
          selectedIconPath: "/static/images/tabbar/problems-active.png",
        },
      ],
      tabarList: [],
    };
  },
  computed: {
    langText() {
      return this.$t("tabbar");
    },
  },
  watch: {
    langText: {
      handler: function (val) {
        this.tabarList = this.tabbar.map((item) => {
          let text = "";
          switch (item.name) {
            case "index":
              text = val.workOrder; // 自助工单
              break;
            case "customerService":
              text = val.customerService; // 在线客服
              break;
            case "serviceTel":
              text = val.serviceTel; // 服务热线
              break;
            case "problems":
              text = val.problems; // 常见问题
              break;
          }
          return {
            ...item,
            text,
          };
        });
      },
      deep: true,
      immediate: true,
    },
    indexBar: {
      handler: function (val) {
        if (val) {
          this.indexBar2 = val;
          sessionStorage.setItem("indexBar", this.indexBar2);
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created() {},
  methods: {
    change(i) {
      let item = this.tabarList[i];
      if (item.tel) {
        this.indexBar2 = "serviceTel";
      } else if (item.pagePath) {
        sessionStorage.setItem("indexBar", item.name);
        uni.navigateTo({
          url: item.pagePath,
        });
      }
    },
    callTel(call) {
      this.indexBar2 = sessionStorage.getItem("indexBar");
      if (call) {
        uni.makePhoneCall({ phoneNumber: "4006765885" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tel-Box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .tel {
    width: 638rpx;
    background: #ffffff;
    border-radius: 21rpx;
    padding-top: 23rpx;
    font-size: 38rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 52rpx;
    text-align: center;
    overflow: hidden;
    text {
      display: block;
      margin-top: 23rpx;
    }
    .tel-btn {
      margin-top: 65rpx;
      background: #e0e0e0;
      font-size: 33rpx;
      font-family: MicrosoftYaHei;
      color: #333333;
      display: flex;
      height: 87rpx;
      view {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      view:last-child {
        background: #007efd;
        color: #ffffff;
      }
    }
  }
}
</style>
