<template>
  <view class="container">
    <Navbar title="客服" />
    <!-- 对接im机器人url -->
    <iframe src="//jzjt.emotibot.com/vca/h5/#/robotchat?appId=8a69fef482c485b00182c4a1010b003c&accountId=c4995563324040f4aefd73a9dc00089b" />
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
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  iframe {
    flex: 1;
    width: 100vw;
    margin: 0;
    padding: 0;
    border: none;
  }
}
</style>
