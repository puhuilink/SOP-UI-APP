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
        {
          name: "index",
          pagePath: "/pages/index/index",
          iconPath: "/static/images/tabbar/index.png",
          selectedIconPath: "/static/images/tabbar/index-active.png",
        },
        // {
        //   name: "customerService",
        //   pagePath: "",
        //   iconPath: "/static/images/tabbar/customer-service.png",
        //   selectedIconPath: "/static/images/tabbar/customer-service-active.png",
        // },
        {
          name: "serviceTel",
          pagePath: "",
          iconPath: "/static/images/tabbar/service-tel.png",
          selectedIconPath: "/static/images/tabbar/service-tel-active.png",
          tel: "4006869091",
        },
        // {
        //   name: "problems",
        //   pagePath: "",
        //   iconPath: "/static/images/tabbar/problems.png",
        //   selectedIconPath: "/static/images/tabbar/problems-active.png",
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
  },
  created() {},
  methods: {
    change(i) {
      let item = this.tabarList[i];
      if (item.pagePath) {
        uni.navigateTo({
          url: item.pagePath,
        });
      } else if (item.tel) {
        uni.makePhoneCall({ phoneNumber: item.tel });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
