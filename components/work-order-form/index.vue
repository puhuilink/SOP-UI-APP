<template>
  <view class="work-order-form">
    <block
      v-for="(item, index) in fields"
      :key="`${item.__config__.formId}_${index}`"
    >
      <!-- 单行输入框 -->
      <view
        class="item"
        v-if="item.__config__.tag === 'el-input' && item.type != 'textarea'"
      >
        <Inputs
          :ref="`form${index}`"
          :config="{
            label: item.__config__.label,
            required: item.__config__.required,
            disabled: item.disabled,
            placeholder: item.placeholder,
            clearable: item.clearable,
            maxlength: item.maxlength,
          }"
          v-model="form[item.formDataType]"
        />
      </view>
      <!-- 多行输入框 -->
      <view
        class="item"
        v-else-if="item.__config__.tag == 'el-input' && item.type == 'textarea'"
      >
        <Textareas
          :ref="`form${index}`"
          :config="{
            label: item.__config__.label,
            required: item.__config__.required,
            disabled: item.disabled,
            placeholder: item.placeholder,
            clearable: item.clearable,
            maxlength: item.maxlength,
          }"
          v-model="form[item.formDataType]"
        />
      </view>
      <!-- 下拉选择 -->
      <view class="item" v-else-if="item.__config__.tag === 'el-select'">
        <Selects
          :ref="`form${index}`"
          :config="{
            label: item.__config__.label,
            required: item.__config__.required,
            disabled: item.disabled,
            placeholder: item.placeholder,
            options: item.__slot__.options,
          }"
          v-model="form[item.formDataType]"
        />
      </view>
      <!-- 级联选择 -->
      <view class="item" v-else-if="item.__config__.tag === 'el-cascader'">
        <Cascader
          :ref="`form${index}`"
          :config="{
            label: item.__config__.label,
            required: item.__config__.required,
            disabled: item.disabled,
            placeholder: item.placeholder,
            options: item.options,
            separator: item.separator,
          }"
          v-model="form[item.formDataType]"
        />
      </view>
      <!-- 单选 -->
      <view class="item" v-else-if="item.__config__.tag === 'el-radio-group'">
        <Radios
          :ref="`form${index}`"
          :config="{
            label: item.__config__.label,
            required: item.__config__.required,
            disabled: item.disabled,
            options: item.__slot__.options,
          }"
          v-model="form[item.formDataType]"
        />
      </view>
      <!-- 多选 -->
      <view
        class="item"
        v-else-if="item.__config__.tag === 'el-checkbox-group'"
      >
        <Checkboxs
          :ref="`form${index}`"
          :config="{
            label: item.__config__.label,
            required: item.__config__.required,
            disabled: item.disabled,
            options: item.__slot__.options,
          }"
          v-model="form[item.formDataType]"
        />
      </view>
      <!-- 时间 -->
      <view class="item" v-else-if="item.__config__.tag === 'el-date-picker'">
        <Datetime
          :ref="`form${index}`"
          :config="{
            label: item.__config__.label,
            required: item.__config__.required,
            disabled: item.disabled,
            placeholder: item.placeholder,
            options: item.options,
            format: item.format,
            type: item.type
          }"
          v-model="form[item.formDataType]"
        />
      </view>
      <!-- 上传 -->
      <view class="item" v-else-if="item.__config__.tag === 'el-upload'">
        <Upload
          :ref="`form${index}`"
          :config="item"
          v-model="form[item.formDataType]"
        />
      </view>
    </block>
  </view>
</template>

<script>
import Inputs from "./inputs.vue";
import Textareas from "./textareas.vue";
import Selects from "./selects.vue";
import Cascader from "./cascader.vue";
import Radios from "./radios.vue";
import Checkboxs from "./checkboxs.vue";
import Datetime from "./datetime.vue";
import Upload from "./upload.vue";
export default {
  components: {
    Inputs,
    Textareas,
    Selects,
    Cascader,
    Radios,
    Checkboxs,
    Datetime,
    Upload,
  },
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
      refsArr: [],
    };
  },
  watch: {
    fields: {
      handler: function (val) {
        console.log(val);
        this.form = val.reduce((obj, item) => {
          if (item.formDataType) {
            obj[item.formDataType] = item.__config__.defaultValue;
          }
          return obj;
        }, {});
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {},
  methods: {
    vervify(callBack) {
      let adopt = [];
      let refsArr = Object.keys(this.$refs);
      refsArr.map(
        (item) =>
          this.$refs[item] &&
          this.$refs[item][0] &&
          this.$refs[item][0].vervify((is) => {
            adopt.push(is);
            if (adopt.length === refsArr.length) {
              if (adopt.includes(false)) {
                callBack(false);
              } else {
                callBack(this.form);
              }
            }
          })
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.work-order-form {
  margin: 22rpx auto 22rpx;
  width: 719rpx;
  background: #ffffff;
  border-radius: 21rpx;
  min-height: 100rpx;
  overflow: hidden;
  padding: 20rpx 24rpx;
  box-sizing: border-box;

  .item {
    min-height: 100rpx;
    display: flex;
    align-items: center;
  }
}
</style>
