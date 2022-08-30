<template>
  <view></view>
</template>
<script>
export default {
  name: "transfer",
  components: {},
  data() {
    return {};
  },
  onLoad() {
    top.postMessage({ goToOrder: 1 });
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
