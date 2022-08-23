<template>
  <view class="container">
    <Navbar title="客服" />
    <!-- 对接im机器人url此链接暂时使用 -->
    <iframe src="/#/pages/customerService/transfer?iframe=1" />
  </view>
</template>

<script>
import Navbar from "@/components/navbar/navbar";
export default {
  name: "customerService",
  components: {
    Navbar,
  },
  data() {
    return {};
  },
  onLoad() {
    window.addEventListener(
      "message",
      (event) => {
        if (event.data && event.data.goToOrder) {
          uni.redirectTo({ url: "/pages/customerService/selectOrder" });
        }
      },
      false
    );
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
iframe {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  border: none;
}
</style>
