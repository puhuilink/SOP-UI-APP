<template>
  <view class="container">
    echarts

    <u-tabbar
      :value="0"
      :fixed="true"
      :placeholder="false"
      :safeAreaInsetBottom="false"
      @change="change"
    >
      <block v-for="(item, index) in tabarList" :key="index">
        <u-tabbar-item :text="item.text" :icon="index === 0 ? item.selectedIconPath : item.iconPath"></u-tabbar-item>
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
      form: {
        dirId: "",
      },
      formId: {
        id: "",
      },
      menuList: [],
      noticeList: "您有一个新的工单待接收，请及时处理",
    };
  },
  onLoad() {
    this.getList();
  },
  computed: {
    ...mapState(["tabarList"]),
  },
  methods: {
    change(name) {
      uni.$u.route(this.tabarList[name].pagePath);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
