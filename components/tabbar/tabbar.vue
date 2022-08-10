<template>
  <u-tabbar
    :value="tabarList.findIndex((item) => item.name === indexBar)"
    :fixed="true"
    :placeholder="false"
    :safeAreaInsetBottom="false"
    @change="change"
  >
    <block v-for="(item, index) in tabarList" :key="index">
      <u-tabbar-item
        :text="item.text"
        :icon="item.name === indexBar ? item.selectedIconPath : item.iconPath"
      ></u-tabbar-item>
    </block>
  </u-tabbar>
</template>

<script>
export default {
  name: "tabbar",
  props: ["indexBar"],
  data() {
    return {
      // 普通用户
      userTabbar: [
        {
          name: "index",
          pagePath: "/pages/index/index",
          // 自助工单
          text: this.$t("tabbar.workOrder"),
          iconPath: "/static/images/tabbar/index.png",
          selectedIconPath: "/static/images/tabbar/index-active.png",
        },
        {
          name: "user",
          pagePath: "/pages/user/user",
          // 我的
          text: this.$t("tabbar.user"),
          iconPath: "/static/images/tabbar/user.png",
          selectedIconPath: "/static/images/tabbar/user-active.png",
        },
      ],
      adminTabbar: [
        {
          name: "echarts",
          pagePath: "/pages/index/echarts",
          // 报表视图
          text: this.$t("tabbar.reportForm"),
          iconPath: "/static/images/tabbar/echarts.png",
          selectedIconPath: "/static/images/tabbar/echarts-active.png",
        },
        {
          name: "index",
          pagePath: "/pages/index/index",
          // 自助工单
          text: this.$t("tabbar.workOrder"),
          iconPath: "/static/images/tabbar/index.png",
          selectedIconPath: "/static/images/tabbar/index-active.png",
        },
        {
          name: "user",
          pagePath: "/pages/user/user",
          // 我的
          text: this.$t("tabbar.user"),
          iconPath: "/static/images/tabbar/user.png",
          selectedIconPath: "/static/images/tabbar/user-active.png",
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
    "$store.getters.userInfo": {
      handler: function (val) {
        console.log(val);
        let { username = "" } = val;
        switch (username) {
          case "admin":
            this.tabarList = this.adminTabbar;
            break;
          default:
            this.tabarList = this.userTabbar;
            break;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created() {},
  methods: {
    change(name) {
      uni.navigateTo({
        url: this.tabarList[name].pagePath,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
