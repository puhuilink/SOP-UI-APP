<template>
  <view class="container">
    <u-icon v-if="(config.clearable || true) && clearable" name="close-circle-fill" color="#C9C9C9" size="36rpx" @click="clear" />
    <view class="label">
      <text class="colorRed" v-if="config.required">*</text>
      <text>{{ `${config.label}：` }}</text>
    </view>
    <u--form :model="form" :rules="rules" ref="textareas">
      <u-form-item prop="val">
        <u--textarea
          autoHeight
          confirmType="done"
          height="80"
          border="none"
          v-model="form.val"
          :disabled="config.disabled"
          :placeholder="config.placeholder"
          :maxlength="config.maxlength || -1"
          @input="change"
          @focus="clearable = true"
          @blur="blur"
        />
      </u-form-item>
    </u--form>
  </view>
</template>

<script>
export default {
  name: "Textareas",
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
      clearable: false,
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
    blur() {
      setTimeout(() => {
        this.clearable = false
      }, 100)
    },
    clear() {
      this.form.val = ""
      this.$emit("input", "");
      console.log(this.form.val)
    },
    vervify(callBack) {
      this.$refs.textareas
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
  position: relative;
  font-size: 29rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.label {
  line-height: 80rpx;
  margin-right: 20rpx;
}
.colorRed {
  font-size: 25rpx;
  font-weight: 400;
  color: #e40a0a;
  margin-right: 5rpx;
}
.u-form {
  min-width: 400rpx;
  flex: 1;
}
.u-icon {
  position: absolute;
  bottom: 16rpx;
  right: 4rpx;
  z-index: 99;
}
.u-textarea {
  padding-top: 0;
  padding-left: 0;
  min-height: 150rpx;
}
</style>
