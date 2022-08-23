<template>
  <view class="container">
    <Navbar title="自助工单" />
    <u-gap height="20rpx" />
    <view class="modular-box work-order">
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
  </view>
</template>
<script>
import Navbar from "@/components/navbar/navbar";
import { getList, getByDir } from "@/api/index.js";
export default {
  name: "selectOrder",
  components: {
    Navbar,
  },
  data() {
    return {
      menuList: [],
    };
  },
  onLoad() {
    this.getList();
  },
  onShow() {},
  computed: {},
  methods: {
    click(name) {
      let dirId = this.menuList[name].id || "";
      let prefix = this.menuList[name].prefix || "";
      getByDir({ dirId }).then((res) => {
        let { code, data = {} } = res;
        let item = data && data.list && data.list[0] && data.list[0];
        if (item.formId) {
          uni.navigateTo({
            url: `/pages/info/formsubmit?id=${item.formId}&title=${item.name}&prefix=${prefix}&processKey=${item.key}`,
          });
        }
      });
    },
    async getList() {
      await getList({ pageNo: 1, pageSize: 100 }).then((res) => {
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
    },
  },
};
</script>

<style lang="scss" scoped>
.modular-box {
  width: 719rpx;
  background: #ffffff;
  margin: 0 auto;
  padding: 30rpx 0;
  box-sizing: border-box;
  border-radius: 21rpx;
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
</style>
