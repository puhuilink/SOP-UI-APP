<template>
  <view class="active-form form-container">
    <view class="form-box">
      <block
        v-for="(item, index) in fields"
        :key="`${item.__config__.formId}_${index}`"
      >
        <view class="form-item flex-row--c">
          <!-- 单行文本框 -->
          <view
            class="line"
            v-if="
              item.__config__.tag === 'el-password' ||
              item.__config__.tag === 'el-code' ||
              (item.__config__.tag === 'el-input' && item.type != 'textarea')
            "
          >
            <view
              :class="
                item.__config__.required ? 'line-left' : 'p-l14 line-left'
              "
            >
              <text class="colorRed" v-if="item.__config__.required">*</text>
              <text class="num" v-if="num">{{ index + 1 }}.</text>
              {{ item.__config__.label }}：
            </view>
            <!-- 发送验证码 -->
            <view
              class="line-right flex-row-sb-c pr20"
              v-if="item.__config__.tag == 'el-code'"
            >
              <input
                type="text"
                class="input"
                :disabled="item.disabled"
                placeholder-class="plaClass"
                :placeholder="item.placeholder"
                v-model="form[item.formDataType]"
                @input="inputVal(index)"
              />
              <view style="width: 250rpx">
                <u-button
                  size="mini"
                  type="primary"
                  :disabled="item.disabled || isSend"
                  @click="sendCode(item)"
                >
                  {{ codeFont }}
                </u-button>
              </view>
            </view>
            <!-- 普通输入框 -->
            <view class="line-right" v-else>
              <input
                type="text"
                class="input"
                :disabled="item.disabled"
                placeholder-class="plaClass"
                :placeholder="item.placeholder"
                v-model="form[item.formDataType]"
                @input="inputVal(index)"
              />
            </view>
          </view>
          <!-- 下拉选择-->
          <view class="line" v-else-if="item.__config__.tag == 'el-select'">
            <view
              :class="
                item.__config__.required ? 'line-left' : 'p-l14 line-left'
              "
            >
              <text class="colorRed" v-if="item.__config__.required">*</text>
              <text class="num" v-if="num">{{ index + 1 }}.</text>
              {{ item.__config__.label }}：
            </view>
            <view class="line-right pr20">
              <input
                type="button"
                class="input text-right"
                placeholder-class="plaClass text-right"
                :placeholder="item.placeholder"
                v-model="form[item.formDataType]"
                :disabled="item.disabled"
                @click="showSelect(item)"
              />
              <view class="select-icon"></view>
              <u-action-sheet
                :actions="item.__slot__.options"
                :title="item.placeholder"
                safeAreaInsetBottom
                cancelText="取消"
                :show="item.__config__.show"
                @select="selectConfirm($event, item)"
                @close="selectClose(item)"
              ></u-action-sheet>
            </view>
          </view>
          <!-- 开关-->
          <view class="line" v-else-if="item.__config__.tag == 'el-switch'">
            <view
              :class="
                item.__config__.required ? 'line-left' : 'p-l14 line-left'
              "
            >
              <text class="colorRed" v-if="item.__config__.required">*</text>
              <text class="num" v-if="num">{{ index + 1 }}.</text>
              {{ item.__config__.label }}：
            </view>
            <view class="line-right">
              <u-switch
                :disabled="item.disabled"
                v-model="form[item.formDataType]"
                @change="switchChange(index, $event)"
              ></u-switch>
            </view>
          </view>
          <!-- 级联选择-->
          <view
            class="line"
            v-else-if="
              item.__config__.tag == 'el-cascader' ||
              item.__config__.tag === 'el-date-range' ||
              item.__config__.tag === 'el-date' ||
              item.__config__.tag === 'el-date-picker'
            "
          >
            <view
              :class="
                item.__config__.required ? 'line-left' : 'p-l14 line-left'
              "
            >
              <text class="colorRed" v-if="item.__config__.required">*</text>
              <text class="num" v-if="num">{{ index + 1 }}.</text>
              {{ item.__config__.label }}：
            </view>
            <view class="line-right pr20">
              <input
                type="text"
                class="input text-right"
                placeholder-class="plaClass text-right"
                v-model="form[item.formDataType]"
                :placeholder="item.placeholder"
                :disabled="item.disabled"
                @click="showSelect(item)"
              />
              <view class="select-icon"></view>
              <w-picker
                :visible.sync="item.__config__.show"
                :mode="item.type"
                :options="item.options"
                :current="true"
                fields="day"
                @confirm="onConfirm($event, item, item.type)"
                @cancel="onCancel(item)"
                :ref="item.type"
              ></w-picker>
            </view>
          </view>
          <!-- 按钮 -->
          <view class="line" v-else-if="item.__config__.tag == 'el-button'">
            <view
              :class="
                item.__config__.required ? 'line-left' : 'p-l14 line-left'
              "
            >
              <text class="colorRed" v-if="item.__config__.required">*</text>
              <text class="num" v-if="num">{{ index + 1 }}.</text>
              {{ item.__config__.label }}：
            </view>
            <view class="line-right">
              <u-button
                type="primary"
                :disabled="item.disabled"
                @click="buttonClick(item)"
              >
                {{ item.__config__.label }}
              </u-button>
            </view>
          </view>
          <!-- 评分-->
          <view class="line" v-else-if="item.__config__.tag == 'el-rate'">
            <view
              :class="
                item.__config__.required ? 'line-left' : 'p-l14 line-left'
              "
            >
              <text class="colorRed" v-if="item.__config__.required">*</text>
              <text class="num" v-if="num">{{ index + 1 }}.</text>
              {{ item.__config__.label }}：
            </view>
            <view class="line-right pr20">
              <u-rate
                :count="item.max"
                v-model="form[item.formDataType]"
                active-icon="heart-fill"
                inactive-icon="heart"
              ></u-rate>
            </view>
          </view>
          <!-- 多行文本框 -->
          <view
            class="textarea-box"
            v-else-if="
              item.__config__.tag == 'el-input' && item.type == 'textarea'
            "
          >
            <view class="line-left" :class="item.__config__.required ? '' : 'p-l14 '">
              <text class="colorRed" v-if="item.__config__.required">*</text>
              <text class="num" v-if="num">{{ index + 1 }}.</text>
              {{ item.__config__.label }}：
            </view>
            <view class="line-bottom-textarea">
              <textarea
                auto-height
                :maxlength="-1"
                :disabled="item.disabled"
                :placeholder="item.placeholder"
                v-model="form[item.formDataType]"
                @input="inputVal(index)"
                placeholder-class="plaClass"
              >
              </textarea>
            </view>
          </view>
          <!-- 上传图片 -->
          <view
            class="img-box pt30 flex-col-l"
            v-else-if="item.__config__.tag == 'el-upload'"
          >
            <view
              class="font26"
              :class="item.__config__.required ? '' : 'p-l14 '"
            >
              <text class="colorRed" v-if="item.__config__.required">*</text>
              <text class="num" v-if="num">{{ index + 1 }}.</text>
              {{ item.__config__.label }}：
            </view>
            <view class="img-upload p30">
              <u-upload
                :uploadList="item.__config__.regList"
                :disabled="item.disabled"
                :accept="item.accept"
                :maxCount="item.maxCount"
                :maxSize="item.maxSize"
                width="150rpx"
                height="150rpx"
                @afterRead="afterRead($event, item)"
                @delete="deletePic($event, item)"
              ></u-upload>
            </view>
          </view>

          <!-- 单选框 -->
          <view class="line-col" v-else-if="item.__config__.tag === 'el-radio-group'">
            <view
              :class="
                item.__config__.required ? 'line-left' : 'p-l14 line-left'
              "
            >
              <text class="colorRed" v-if="item.__config__.required">*</text>
              <text class="num" v-if="num">{{ index + 1 }}.</text>
              {{ item.__config__.label }}：
              <text
                style="
                  font-size: 20rpx;
                  color: #9e9e9e;
                  margin-left: 23rpx;
                  width: 140rpx;
                "
                >(单选)
              </text>
            </view>
            <view
              class="line-bottom-select"
              :style="{ 'padding-left': num ? '60rpx' : '34rpx' }"
            >
              <u-radio-group
                v-model="form[item.formDataType]"
                @change="radioChange($event, index)"
                placement="row"
              >
                <u-radio
                  size="35rpx"
                  icon-size="35rpx"
                  label-size="25rpx"
                  shape="circle"
                  v-for="(info, radioIndex) in item.__slot__.options"
                  :key="radioIndex"
                  :label="info.label"
                  :name="info.label"
                  :disabled="info.disabled"
                  >{{ info.label }}
                </u-radio>
              </u-radio-group>
            </view>
          </view>
          <!-- 多选框 -->
          <view
            class="line-col"
            v-else-if="item.__config__.tag == 'el-checkbox-group'"
          >
            <view
              :class="
                item.__config__.required ? 'line-left' : 'p-l14 line-left'
              "
            >
              <text class="colorRed" v-if="item.__config__.required">*</text>
              <text class="num" v-if="num">{{ index + 1 }}.</text>
              {{ item.__config__.label }}：
              <text
                style="
                  font-size: 20rpx;
                  color: #9e9e9e;
                  margin-left: 23rpx;
                  width: 140rpx;
                "
                >(多选)
              </text>
            </view>
            <view
              class="line-bottom-select pr20"
              :style="{ 'padding-left': num ? '60rpx' : '34rpx' }"
            >
              <u-checkbox-group
                v-model="form[item.formDataType]"
                @change="checkboxGroupChange($event, item)"
              >
                <u-checkbox
                  icon-size="25rpx"
                  label-size="25rpx"
                  size="30rpx"
                  v-for="(checkboxItem, checkboxIndex) in item.__slot__.options"
                  :key="checkboxIndex"
                  :label="checkboxItem.label"
                  :disabled="checkboxItem.disabled"
                  :name="checkboxItem.label"
                >
                </u-checkbox>
              </u-checkbox-group>
            </view>
          </view>

          <!-- 手机输入框 -->
          <view class="line" v-else-if="item.__config__.tag == 'el-mobile'">
            <view
              :class="
                item.__config__.required ? 'line-left' : 'p-l14 line-left'
              "
            >
              <text class="colorRed" v-if="item.__config__.required">*</text>
              <text class="num" v-if="num">{{ index + 1 }}.</text>
              {{ item.__config__.label }}：
            </view>
            <view class="line-right pr20">
              <input
                type="number"
                v-model="form[item.formDataType]"
                :placeholder="item.placeholder"
                @input="inputVal(index)"
                class="input"
                :disabled="item.disabled"
                :maxlength="11"
                placeholder-class="plaClass"
              />
              <view style="width: 200rpx" v-if="item.oneKeyPhone">
                <u-button
                  size="mini"
                  type="primary"
                  open-type="getPhoneNumber"
                  @getphonenumber="getphonenumber"
                  :disabled="item.disabled"
                  >一键获取
                </u-button>
              </view>
            </view>
          </view>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
import mixins from "./mixins";

export default {
  name: "activeForm",
  mixins: [mixins],
  props: {
    //是否展示序号
    num: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Array,
      default: () => {
        return [];
      },
    },
    //是否编辑表单
    isEdit: {
      type: Boolean,
      default: false,
    },
    //是否能删除
    isDel: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      submitData: "",
      selectBox: [],
      currentSelectIndex: "",
      currentSelectValue: "",
      codeFont: "获取验证码",
      wait: 60,
      isSend: false,
    };
  },
  computed: {
    fields: {
      get() {
        return this.value;
      },
      set(nval) {
        this.$emit("input", nval);
      },
    },
    form: {
      get() {
        return this.value.reduce((obj, item) => {
          item.formDataType &&
            (obj[item.formDataType] = item.__config__.defaultValue);
          // obj.prefix = "S";
          // obj.processKey = "demo1";
          // obj.approvalDocument = "";
          // obj.associateWorkOrder = "";
          // obj.degreeOfInfluence = "";
          // obj.expectedCompletionTime = "";
          // obj.operationRecord = "";
          // obj.owningModule = "";
          // obj.owningSystem = "";
          // obj.priority = "";
          // obj.recorder = "";
          // obj.recorderDept = "";
          // obj.serviceRequestClassification = "";
          // obj.serviceRequestDetails = "";
          // obj.serviceRequestSource = "";
          // obj.title = "";
          // obj.urgency = "";
          // obj.userContactDetails = "";
          // obj.userDept = "";
          // obj.userName = "";
          return obj;
        }, {});
      },
    },
  },
  methods: {
    // 删除图片
    deletePic($event, item) {
      item.__config__.regList.splice($event.index, 1);
      this.$emit("input", this.fields);
    },
    // 新增图片
    afterRead($event, item) {
      // 当设置 mutiple 为 true 时, upload 为数组格式，否则为对象格式
      item.__config__.regList =
        item.auto - upload ? $event.upload : [$event.upload];
      this.$emit("input", this.fields);
    },
    //显示select
    showSelect(item) {
      if (
        item.__config__.tagIcon == "cascader" ||
        item.__config__.tagIcon == "listicon_14"
      ) {
        item.type = "linkage";
      } else if (item.__config__.tagIcon == "date-range") {
        item.type = "range";
      } else if (item.__config__.tagIcon == "date") {
        item.type = "date";
      }
      item.__config__.show = true;
      this.$emit("input", this.fields);
    },
    //input输入框的值传给父组件
    inputVal(index) {
      const data = {
        val: this.fields[index].__config__.defaultValue,
        index: index,
      };
      if (String(data.val) != "" && String(data.index) != "") {
        this.fields[data.index].__config__.defaultValue = data.val;
      }
      this.$emit("input", this.fields);
    },
    //开关
    switchChange(index, item) {
      this.fields[index].formDataType = item;
      this.$emit("input", this.fields);
    },
    // 单选 下拉框点击确定
    selectConfirm($event, item) {
      item.__slot__.label = $event.label;
      this.form[item.formDataType] = $event.label;
      item.__config__.show = false;
      this.$emit("input", this.fields);
    },
    selectClose(item) {
      item.__config__.show = false;
    },
    //单选 点击触发
    radioChange($event, index) {
      this.$emit("input", this.fields);
    },
    //级联确定
    onConfirm($event, item) {
      if ((item.type = "range")) {
        this.form[item.formDataType] = $event.result;
      } else {
        this.form[item.formDataType] = $event.value;
      }
      item.__config__.show = false;
      this.$emit("input", this.fields);
    },
    onCancel(item) {
      item.__config__.show = false;
      this.$emit("input", this.fields);
    },
    buttonClick(item) {
      if (item.__config__.tag == "el-button") {
        this.$emit("buttonClick", this.fields);
      }
    },
    //复选框 点击触发
    checkboxGroupChange($event, item) {
      // console.log("$event", $event)
      const selectArr = item.__slot__.options.filter((v) =>
        $event.includes(v.name)
      ); //过滤
      // console.log("selectArr", selectArr)
      this.form[item.formDataType] = selectArr.map((v) => v.value);
      this.$emit("input", this.fields);
    },

    // 发送验证码
    sendCode(item) {
      let setTime = 0;
      this.sendCodeCallback(item);
      if (!this.isSend) {
        this.isSend = true;
        setTime = setInterval(() => {
          this.wait--;

          this.codeFont = this.wait + "重新发送";
          if (this.wait == 0) {
            clearInterval(setTime);
            this.codeFont = "获取验证码";
            this.isSend = false;
            this.wait = 60;
          }
        }, 1000);
      }
    },
    //校验
    $vervify() {
      return new Promise((resolve, reject) => {
        this.fields.forEach((item) => {
          if (item.__config__.required) {
            switch (item.tag) {
              case "el-checkbox":
                if (this.form[item.formDataType].length === 0) {
                  uni.showToast({
                    title: "请选择" + item.__config__.label,
                    duration: 2000,
                    icon: "none",
                  });

                  reject(false);
                  // throw Error(); //终止函数
                }
                break;
              case "upload":
                if (this.form[item.formDataType].length === 0) {
                  uni.showToast({
                    title: "请选择" + item.__config__.label,
                    duration: 2000,
                    icon: "none",
                  });
                  reject(false);
                  // throw Error(); //终止函数
                }
                break;
              case "mobile":
                if (!this.form[item.formDataType]) {
                  uni.showToast({
                    // title: item.rules.errMess || "手机号不能为空",
                    title: "手机号不能为空",
                    duration: 2000,
                    icon: "none",
                  });
                  reject(false);
                  // throw Error(); //终止函数
                }
                if (!/^\s{0}$|^1\d{10}$/.test(this.form[item.formDataType])) {
                  uni.showToast({
                    title: "手机格式错误",
                    duration: 2000,
                    icon: "none",
                  });
                  reject(false);
                  // throw Error(); //终止函数
                }
                break;
              default:
                if (
                  [null, undefined, ""].includes(this.form[item.formDataType])
                ) {
                  uni.showToast({
                    title: item.__config__.label + "不能为空",
                    duration: 2000,
                    icon: "none",
                  });
                  reject(false);
                  // throw Error(); //终止函数
                }
                // if (item.rules.regexp && !(new RegExp(item.rules.regexp).test(this.form[item.formDataType]))) {
                //     uni.showToast({
                //         title: item.__config__.label + "格式不正确",
                //         duration: 2000,
                //         icon: "none",
                //     });
                //     reject(false)
                //     // throw Error(); //终止函数
                // }
                break;
            }
          }
        });
        resolve(this.$submitForm());
      });
    },
    // 提交序列化的表单
    $submitForm() {
      const form = this.form;
      // let submitData = {};
      // for (let i = 0; i < fields.length; i++) {
      //     if (fields[i].__config__.tag === 'upload') {
      //         submitData[fields[i].__config__.formId] = fields[i].__config__.regList;
      //         break;
      //     }
      //     submitData[fields[i].rules.name] = fields[i].__config__.defaultValue;

      // }
      return form;
    },
  },
};
</script>

<style lang="scss" scoped>
.active-form {
  min-height: 200rpx;

  .form-item {
    min-height: 100rpx;
    color: #333333;
    font-size: 29rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
  }

  .plaClass {
    font-size: 29rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #b9b9b9;
  }

  // 下拉icon
  .select-icon {
    float: right;
    border-bottom: 2rpx solid #999;
    border-right: 2rpx solid #999;
    width: 16rpx;
    height: 16rpx;
    transform: rotate(-45deg);
    margin-right: 10rpx;
  }

  .form-box {
    width: 100%;
    box-sizing: border-box;
  }

  .colorRed {
    color: red;
    padding: 0 10rpx;
  }

  .line-right {
    margin-left: 20px;
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }

  .line-bottom-select {
    padding-top: 40rpx;
  }

  .line-bottom-textarea {
    flex: 1;

    textarea {
      min-height: 200rpx;
      width: 100%;
    }
  }

  .line-left {
    display: flex;
    min-width: 22%;
    align-items: center;
    height: 100%;
    letter-spacing: 0.5px;
    box-sizing: border-box;
    white-space:nowrap;
  }

  .p-l14 {
    padding-left: 34rpx;
  }

  .textarea-box {
    width: 100%;
    padding: 20rpx 0;
    display: flex;

    textarea {
      padding: 0 32rpx;
      box-sizing: border-box;
      color: #333;
    }
  }

  .line {
    padding: 27rpx 0;
    display: flex;
    align-items: center;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;

    .input {
      padding-right: 20rpx;
      height: 100%;
      width: 100%;
      text-align: left;
      color: #333;
      border: none;
      overflow: hidden;
      text-overflow: ellipsis;
      outline: none;
    }
  }

  .line-col {
    padding: 27rpx 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    border-bottom: 1px solid #ededed;
    overflow: hidden;

    .input {
      padding-right: 20rpx;
      height: 100%;
      width: 100%;
      text-align: left;
      color: #333;
      border: none;
      overflow: hidden;
      text-overflow: ellipsis;
      outline: none;
    }
  }

  .num {
    margin-right: 8rpx;
  }

  .text-right {
    text-align: right !important;
  }
}
</style>
