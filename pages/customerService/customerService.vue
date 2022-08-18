<template>
  <view class="container">
    <Navbar title="客服" />

    <u-gap height="110rpx" />
    <Tabbar indexBar="customerService" />
  </view>
</template>

<script>
import Navbar from "@/components/navbar/navbar";
import Tabbar from "@/components/tabbar/tabbar";
export default {
  name: "customerService",
  components: {
    Navbar,
    Tabbar,
  },
  data() {
    return {};
  },
  onLoad() {},
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
