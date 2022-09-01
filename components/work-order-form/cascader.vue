<template>
  <view class="container">
    <view class="label">
      <text class="colorRed" v-if="config.required">*</text>
      <text>{{ `${config.label}：` }}</text>
    </view>

    <u--form :model="form" :rules="rules" ref="cascader">
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
        ref="uPicker"
        :show="show"
        :columns="columns"
        @confirm="confirm"
        @cancel="show = false"
        @change="changeHandler"
      />
    </u--form>
  </view>
</template>

<script>
export default {
  name: "cascader",
  props: {
    value: {
      type: Array | String,
      default: () => {
        return [];
      },
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
      columnData: [],
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
          this.form.val = val.join(`${this.config.separator || ","}`);
        }
      },
      deep: true,
      immediate: true,
    },
    config: {
      handler: function (val) {
        if (val.required) {
          this.rules.val[0].required = val.required;
        }
        if (val.label) {
          this.rules.val[0].message = `请选择${val.label}`;
        }
        if (val.options) {
          this.columnInit(val.options);
        }
        if (this.config.separator) {
          let val = this.form.val.split();
          this.form.val = val.join(`${this.config.separator}`);
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    columnInit(data) {
      this.columnData = data;
      this.columns[0] = [];
      data.map((item, i) => {
        this.columns[0].push(item.label);
        if (item.children && i === 0) this.columnItemInit(item.children, 1);
      });
    },
    columnItemInit(data, i) {
      this.columns[i] = [];
      data.map((item, x) => {
        this.columns[i].push(item.label);
      });
      if (data[0].children) this.columnItemInit(data[0].children, ++i);
    },
    changeHandler(e) {
      let { columnIndex, indexs } = e;
      let picker = this.$refs.uPicker;
      let data = "";
      indexs.slice(0, columnIndex + 1).map((item) => {
        if (!data) {
          data = this.columnData[item].children;
        } else {
          data = data[item].children;
        }
      });
      if (data) {
        this.columnItemInit(data, columnIndex + 1);
      }
      this.columns.map((item, i) => {
        if (i > columnIndex) {
          picker.setColumnValues(i, item);
        }
      });
    },
    confirm(e) {
      this.form.val = e.value.join(`${this.config.separator}`);
      this.show = false;
      this.$emit("input", e.value);
    },
    vervify(callBack) {
      this.$refs.cascader
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
