<template>
  <view class="container">
    <view class="label">
      <text class="colorRed" v-if="config.required">*</text>
      <text>{{ `${config.label}：` }}</text>
    </view>
    <u--form :model="form" :rules="rules" ref="selects">
      <u-form-item prop="val" @click="!config.disabled && (show = true)">
        <u--input
          inputAlign="right"
          border="none"
          v-model="form.val"
          disabled
          disabledColor="#ffffff"
          placeholderClass="placeholderClass"
          :placeholder="config.placeholder || '请选择'"
        />
        <u-icon slot="right" name="arrow-down" color="#C9C9C9" size="36rpx" />
      </u-form-item>
      <u-datetime-picker
        :show="show"
        v-model="form.val"
        mode="time"
        @cancel="show = false"
        @confirm="confirm"
      />
    </u--form>
  </view>
</template>

<script>
export default {
  name: "datetime",
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
          },
        ],
      },
      show: false,
    };
  },
  computed: {},
  watch: {
    value: {
      handler: function (val) {
        if (!val) return;
        this.form.val = val;
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
        if (val.options) {
          this.columns[0] = val.options;
        }
        // console.log(val.format);
      },
      deep: true,
      immediate: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    confirm(e) {
      this.form.val = e.value;
      this.show = false;
      this.$emit("input", this.form.val);
    },
    vervify(callBack) {
      this.$refs.selects
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
  font-size: 29rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  display: flex;
  justify-content: space-between;
}
.label {
  line-height: 80rpx;
}
.colorRed {
  font-size: 25rpx;
  font-weight: 400;
  color: #e40a0a;
  margin-right: 5rpx;
}
.u-icon {
  margin-left: 20rpx;
}
.u-form {
  flex: 1;
}
</style>
