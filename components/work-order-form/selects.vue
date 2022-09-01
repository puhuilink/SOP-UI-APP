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
      <u-picker
        keyName="label"
        ref="uPicker"
        :show="show"
        :columns="columns"
        @confirm="confirm"
        @cancel="show = false"
      />
    </u--form>
  </view>
</template>

<script>
export default {
  name: "selects",
  props: {
    value: {
      type: String | Array,
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
      columns: [],
    };
  },
  computed: {},
  watch: {
    value: {
      handler: function (val) {
        if (!val) return;
        if (typeof val === "string") {
          this.form.val = val;
        } else if (val.length > 0) {
          this.form.val = val.join("");
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
        if (val.options) {
          this.columns[0] = val.options;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    confirm(e) {
      console.log(e);
      this.form.val = e.value[0].label;
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
