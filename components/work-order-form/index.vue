<template>
  <view>
    <block
      v-for="(item, index) in fields"
      :key="`${item.__config__.formId}_${index}`"
    >
    
    </block>
  </view>
</template>

<script>
export default {
  name: "workOrderForm",
  props: ["fields"],
  props: {
    fields: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      form: {},
    };
  },
  watch: {
    fields: {
      handler: function (val) {
        this.form = val.reduce((obj, item) => {
          if (item.formDataType) {
            obj[item.formDataType] = item.__config__.defaultValue;
          }
          return obj;
        }, {});
        console.log(this.form);
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
