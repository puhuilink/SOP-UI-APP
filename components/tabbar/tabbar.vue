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
      tabbar: [
        // {
        //   name: "echarts",
        //   pagePath: "/pages/index/echarts",
        //   iconPath: "/static/images/tabbar/echarts.png",
        //   selectedIconPath: "/static/images/tabbar/echarts-active.png",
        // },
        {
          name: "index",
          pagePath: "/pages/index/index",
          iconPath: "/static/images/tabbar/index.png",
          selectedIconPath: "/static/images/tabbar/index-active.png",
        },
        // {
        //   name: "user",
        //   pagePath: "/pages/user/user",
        //   iconPath: "/static/images/tabbar/user.png",
        //   selectedIconPath: "/static/images/tabbar/user-active.png",
        // },
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
            case "echarts":
              text = val.reportView; // 报表视图
              break;
            case "index":
              text = val.workOrder; // 自助工单
              break;
            case "user":
              text = val.user; // 我的
              break;
          }
          return {
            ...item,
            text
          };
        });
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
