<template>
  <view class="container">
    <view class="label">
      <text class="colorRed" v-if="config.required">*</text>
      <text>{{ `${config.label}：` }}</text>
    </view>
    <u--form :model="form" :rules="rules" ref="inputs">
      <u-form-item prop="val">
        <u--input
          border="none"
          v-model="form.val"
          :disabled="config.disabled"
          :placeholder="config.placeholder"
          :clearable="config.clearable"
          :maxlength="config.maxlength || -1"
          @input="change"
        />
      </u-form-item>
    </u--form>
  </view>
</template>

<script>
export default {
  name: "inputs",
  props: {
    value: {
      type: String,
      default: "",
    },
    config: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      form: {
        val: "",
      },
      rules: {
        val: [
          {
            type: "string",
            required: false,
            message: "",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  computed: {},
  watch: {
    value: {
      handler: function (val) {
        if (val) {
          this.form.val = val;
        }
      },
      immediate: true,
    },
    config: {
      handler: function (val) {
        if (val.required) {
          this.rules.val[0].required = val.required;
        }
        if (val.label) {
          this.rules.val[0].message = `请填写${val.label}`;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    change(nval) {
      this.$emit("input", nval);
    },
    vervify(callBack) {
      this.$refs.inputs
        .validate()
        .then((res) => {
          callBack(true);
        })
        .catch(() => {
          callBack(false);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  font-size: 29rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.label {
  line-height: 80rpx;
  margin-right: 10rpx;
}
.colorRed {
  font-size: 25rpx;
  font-weight: 400;
  color: #e40a0a;
  margin-right: 5rpx;
}
.u-form {
  flex: 1;
  min-width: 400rpx;
}
</style>
