<template>
  <view class="container">
    <view class="label">
      <text class="colorRed" v-if="config.required">*</text>
      <text>{{ `${config.label}：` }}</text>
    </view>
    <u--form :model="form" :rules="rules" ref="selects">
      <u-form-item prop="val">
        <u-radio-group placement="row" v-model="form.val" @change="groupChange">
          <u-radio
            :customStyle="{ margin: '0 42rpx 30rpx 0' }"
            v-for="(item, index) in radiolist"
            :key="index"
            :label="item.label"
            :name="item.label"
            @change="radioChange"
            :disabled="config.disabled"
          />
        </u-radio-group>
      </u-form-item>
    </u--form>
  </view>
</template>

<script>
export default {
  name: "radios",
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
      radiolist: [],
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
          this.radiolist = val.options;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    groupChange(n) {
      this.form.val = n;
      this.$emit("input", n);
    },
    radioChange() {},
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
  line-height: 80rpx;
  display: flex;
}
.label {
  white-space: nowrap;
  line-height: 70rpx;
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
  margin-left: 20rpx;
}
</style>
