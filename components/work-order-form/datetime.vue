<template>
  <view class="container">
    <view class="label">
      <text class="colorRed" v-if="config.required">*</text>
      <text>{{ `${config.label}：` }}</text>
    </view>
    <u--form :model="form" :rules="rules" ref="datetime">
      <u-form-item prop="val" @click="!config.disabled && (show = true)">
        <u--input
          inputAlign="right"
          border="none"
          :value="form.val"
          disabled
          disabledColor="#ffffff"
          placeholderClass="placeholderClass"
          :placeholder="config.placeholder || '请选择'"
        />
        <u-icon slot="right" name="arrow-down" color="#C9C9C9" size="36rpx" />
      </u-form-item>
      <u-datetime-picker
        :show="show"
        :value="form.val"
        :mode="type"
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
      type: "date",
      // isRange: false,
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
        if (val.type) {
          if (val.type === "date") {
            this.type = "date";
          } else if (val.type === "datetime") {
            this.type = "datetime";
          } else if (val.type === "time") {
            this.type = "time";
          }
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    format(usedDay, fmt) {
      let usedDate = new Date(usedDay);
      let o = {
        "M+": usedDate.getMonth() + 1, //月份
        "d+": usedDate.getDate(), //日
        "H+": usedDate.getHours(), //小时
        "m+": usedDate.getMinutes(), //分
        "s+": usedDate.getSeconds(), //秒
        "q+": Math.floor((usedDate.getMonth() + 3) / 3), //季度
        S: usedDate.getMilliseconds(), //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (usedDate.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    },
    confirm(e) {
      console.log(this.config.format)
      this.form.val = this.format(e.value, this.config.format);
      this.show = false;
      this.$emit("input", this.form.val);
    },
    vervify(callBack) {
      this.$refs.datetime
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
  min-width: 15rpx;
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
