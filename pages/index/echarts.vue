<template>
  <view class="container">
    echarts

    <u-tabbar
      :value="tabarList.findIndex(item => (item.name === 'echarts'))"
      :fixed="true"
      :placeholder="false"
      :safeAreaInsetBottom="false"
      @change="change"
    >
      <block v-for="(item, index) in tabarList" :key="index">
        <u-tabbar-item
          :text="item.text"
          :icon="item.name === 'echarts' ? item.selectedIconPath : item.iconPath"
        ></u-tabbar-item>
      </block>
    </u-tabbar>
  </view>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "index",
  components: {},
  data() {
    return {};
  },
  onLoad() {},
  computed: {
    ...mapState(["tabarList"]),
  },
  methods: {
    change(name) {
      uni.navigateTo({
        url: this.tabarList[name].pagePath,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
