<template>
  <view class="active-form form-container">
    <u-toast ref="uToast"></u-toast>
    <view class="form-box">
      <block v-for="(item, index) in fields" :key="`${item.__config__.formId}_${index}`">
        <view class="form-item flex-row--c">
          <!-- 单行文本框 -->
          <view class="line" v-if="
            item.__config__.tag === 'el-password' ||
            item.__config__.tag === 'el-code' ||
            (item.__config__.tag === 'el-input' && item.type != 'textarea')
          ">
            <view class='line-left'>
              <text class="colorRed" v-if="item.__config__.required && readonly == false && readonly == false">*</text>
              <text class="num" v-if="num">{{ index + 1 }}.</text>
              <view :class="
                readonly ? 'plaClass' : ''
              ">{{ item.__config__.label }}：</view>
            </view>
            <!-- 发送验证码 -->
            <view class="line-right flex-row-sb-c pr20" v-if="item.__config__.tag == 'el-code'">
              <input type="text" class="input" :readonly="readonly" :disabled="item.disabled"
                placeholder-class="plaClass" :placeholder="item.placeholder" v-model="form[item.formDataType]"
                @input="inputVal(index)" />
              <view style="width: 250rpx">
                <u-button size="mini" type="primary" :readonly="readonly" :disabled="item.disabled || isSend"
                  @click="sendCode(item)">
                  {{ codeFont }}
                </u-button>
              </view>
            </view>
            <!-- 普通输入框 -->
            <view class="line-right" v-else>
              <u-input type="text" class="input" :readonly="readonly" :disabled="item.disabled"
                placeholder-class="plaClass" :placeholder="item.placeholder" v-model="form[item.formDataType]"
                @input="inputVal(index)" />
            </view>
          </view>
          <!-- 下拉选择-->
          <view class="line" v-else-if="item.__config__.tag == 'el-select'">
            <view class='line-left'>
              <text class="colorRed" v-if="item.__config__.required && readonly == false">*</text>
              <text class="num" v-if="num">{{ index + 1 }}.</text>
              <view :class="
                readonly ? 'plaClass' : ''
              ">{{ item.__config__.label }}：</view>
            </view>
            <view class="line-right pr20">
              <input type="button" class="input text-right" placeholder-class="plaClass text-right"
                :placeholder="item.placeholder" v-model="form[item.formDataType]" :readonly="readonly"
                :disabled="item.disabled" @click="showSelect(item)" />
              <view class="select-icon"></view>
              <u-action-sheet :actions="item.__slot__.options" :title="item.placeholder" safeAreaInsetBottom
                cancelText="取消" :show="readonly ? false : item.__config__.show" @select="selectConfirm($event, item)"
                @close="selectClose(item)"></u-action-sheet>
            </view>
          </view>
          <!-- 开关-->
          <view class="line" v-else-if="item.__config__.tag == 'el-switch'">
            <view class='line-left'>
              <text class="colorRed" v-if="item.__config__.required && readonly == false">*</text>
              <text class="num" v-if="num">{{ index + 1 }}.</text>
              <view :class="
                readonly ? 'plaClass' : ''
              ">{{ item.__config__.label }}：</view>
            </view>
            <view class="line-right">
              <u-switch :disabled="item.disabled" :readonly="readonly" v-model="form[item.formDataType]"
                @change="switchChange(index, $event)"></u-switch>
            </view>
          </view>
          <!-- 级联选择-->
          <view class="line" v-else-if="
            item.__config__.tag == 'el-cascader' ||
            item.__config__.tag === 'el-date-range' ||
            item.__config__.tag === 'el-date' ||
            item.__config__.tag === 'el-date-picker'
          ">
            <view class='line-left'>
              <text class="colorRed" v-if="item.__config__.required && readonly == false">*</text>
              <text class="num" v-if="num">{{ index + 1 }}.</text>
              <view :class="
                readonly ? 'plaClass' : ''
              ">{{ item.__config__.label }}：</view>
            </view>
            <view class="line-right pr20">
              <input type="text" class="input text-right" placeholder-class="plaClass text-right" :readonly="readonly"
                v-model="form[item.formDataType]" :placeholder="item.placeholder" :disabled="item.disabled"
                @click="showSelect(item)" />
              <view class="select-icon"></view>
              <w-picker :visible.sync="readonly ? false : item.__config__.show" :mode="item.type"
                :options="item.options" :current="true" fields="day" @confirm="onConfirm($event, item, item.type)"
                @cancel="onCancel(item)" :ref="item.type"></w-picker>
            </view>
          </view>
          <!-- 按钮 -->
          <view class="line" v-else-if="item.__config__.tag == 'el-button'">
            <view class='line-left'>
              <text class="colorRed" v-if="item.__config__.required && readonly == false">*</text>
              <text class="num" v-if="num">{{ index + 1 }}.</text>
              <view :class="
                readonly ? 'plaClass' : ''
              ">{{ item.__config__.label }}：</view>
            </view>
            <view class="line-right">
              <u-button type="primary" :disabled="readonly ? true : item.disabled" @click="buttonClick(item)">
                {{ item.__config__.label }}
              </u-button>
            </view>
          </view>
          <!-- 评分-->
          <view class="line" v-else-if="item.__config__.tag == 'el-rate'">
            <view class='line-left'>
              <text class="colorRed" v-if="item.__config__.required && readonly == false">*</text>
              <text class="num" v-if="num">{{ index + 1 }}.</text>
              <view :class="
                readonly ? 'plaClass' : ''
              ">{{ item.__config__.label }}：</view>
            </view>
            <view class="line-right pr20">
              <u-rate :count="item.max" :readonly="readonly" v-model="form[item.formDataType]" active-icon="heart-fill"
                inactive-icon="heart"></u-rate>
            </view>
          </view>
          <!-- 多行文本框 -->
          <view class="textarea-box" v-else-if="
            item.__config__.tag == 'el-input' && item.type == 'textarea'
          ">
            <view class="line-left">
              <text class="colorRed" v-if="item.__config__.required && readonly == false">*</text>
              <text class="num" v-if="num">{{ index + 1 }}.</text>
              <view :class="
                readonly ? 'plaClass' : ''
              ">{{ item.__config__.label }}：</view>
            </view>
            <view class="line-bottom-textarea">
              <textarea auto-height :maxlength="-1" :disabled="readonly" :placeholder="item.placeholder"
                v-model="form[item.formDataType]" @input="inputVal(index)" placeholder-class="plaClass">
              </textarea>
            </view>
          </view>
          <!-- 上传-->
          <view class="img-box pt30 flex-col-l" v-else-if="item.__config__.tag == 'el-upload'">
            <view class='line-left'>
              <text class="colorRed" v-if="item.__config__.required && readonly == false">*</text>
              <text class="num" v-if="num">{{ index + 1 }}.</text>
              <view :class="
                readonly ? 'plaClass' : ''
              ">{{ item.__config__.label }}：</view>
            </view>
            <view class="img-upload p30">
              <u-upload :fileList="item.__config__.regList" :disabled="readonly ? true : item.disabled"
                :accept="item.accept" :maxCount="item.maxCount" :maxSize="item.maxSize" width="150rpx" height="150rpx"
                @afterRead="afterRead($event, item)" @delete="deletePic($event, item)"></u-upload>
            </view>
          </view>

          <!-- 单选框 -->
          <view class="line-col" v-else-if="item.__config__.tag === 'el-radio-group'">
            <view class='line-left'>
              <text class="colorRed" v-if="item.__config__.required && readonly == false">*</text>
              <text class="num" v-if="num">{{ index + 1 }}.</text>
              <view :class="
                readonly ? 'plaClass' : ''
              ">{{ item.__config__.label }}：</view>
              <text style="
                  font-size: 20rpx;
                  color: #9e9e9e;
                  margin-left: 23rpx;
                  width: 140rpx;
                ">(单选)
              </text>
            </view>
            <view class="line-bottom-select" :style="{ 'padding-left': num ? '60rpx' : '34rpx' }">
              <u-radio-group v-model="form[item.formDataType]" @change="radioChange($event, index)" placement="row">
                <u-radio size="35rpx" icon-size="35rpx" label-size="25rpx" shape="circle"
                  v-for="(info, radioIndex) in item.__slot__.options" :key="radioIndex" :label="info.label"
                  :name="info.label" :disabled="readonly ? true : info.disabled">{{ info.label }}
                </u-radio>
              </u-radio-group>
            </view>
          </view>

          <!-- 多选框 -->
          <view class="line-col" v-else-if="item.__config__.tag == 'el-checkbox-group'">
            <view class='line-left'>
              <text class="colorRed" v-if="item.__config__.required && readonly == false">*</text>
              <text class="num" v-if="num">{{ index + 1 }}.</text>
              <view :class="
                readonly ? 'plaClass' : ''
              ">{{ item.__config__.label }}：</view>
              <text style="
                  font-size: 20rpx;
                  color: #9e9e9e;
                  margin-left: 23rpx;
                  width: 140rpx;
                ">(多选)
              </text>
            </view>
            <view class="line-bottom-select pr20" :style="{ 'padding-left': num ? '60rpx' : '34rpx' }">
              <u-checkbox-group v-model="form[item.formDataType]" @change="checkboxGroupChange($event, item)">
                <u-checkbox icon-size="25rpx" label-size="25rpx" size="30rpx"
                  v-for="(checkboxItem, checkboxIndex) in item.__slot__.options" :key="checkboxIndex"
                  :label="checkboxItem.label" :disabled="readonly ? true : checkboxItem.disabled"
                  :name="checkboxItem.label">
                </u-checkbox>
              </u-checkbox-group>
            </view>
          </view>

          <!-- 手机输入框 -->
          <view class="line" v-else-if="item.__config__.tag == 'el-mobile'">
            <view class='line-left'>
              <text class="colorRed" v-if="item.__config__.required && readonly == false">*</text>
              <text class="num" v-if="num">{{ index + 1 }}.</text>
              <view :class="
                readonly ? 'plaClass' : ''
              ">{{ item.__config__.label }}：</view>
            </view>
            <view class="line-right pr20">
              <input type="number" v-model="form[item.formDataType]" :placeholder="item.placeholder"
                @input="inputVal(index)" class="input" :disabled="readonly ? true : item.disabled" :maxlength="11"
                placeholder-class="plaClass" />
            </view>
          </view>
          <!-- 富文本解析器  -->
          <view class="textarea-box" v-else-if="item.__config__.tag == 'tinymce'">
            <view class='line-left'>
              <text class="colorRed" v-if="item.__config__.required && readonly == false">*</text>
              <text class="num" v-if="num">{{ index + 1 }}.</text>
              <view :class="
                readonly ? 'plaClass' : ''
              ">{{ item.__config__.label }}：</view>
            </view>
            <view class="line-bottom-textarea">
              <u-parse :readonly="readonly" :content="item.__config__.defaultValue" />
            </view>
          </view>
        </view>
      </block>
      <view>
        <u-popup :show="isShow" @close="close" @open="open">
          <view class="content">
            <mSidebar title="进度详情">
              <view class="row">
                <m-steps v-for="(item, index) in wrapRecordList" :item="item" :key="index" :index="index"
                  :activity="activity" date="updateTime">
                  <text slot="status">{{
                      progressStatus[item.progressStatus]
                  }}</text>
                </m-steps>
              </view>
            </mSidebar>
          </view>
        </u-popup>
      </view>
    </view>
  </view>
</template>

<script>
import { uploadFile } from "@/api/file.js"
import mixins from "./mixins";
import mSidebar from "@/components/m-sidebar/m-sidebar.vue";
import mSteps from "@/components/m-steps/m-steps.vue";

export default {
  name: "activeForm",
  components: {
    mSidebar,
    mSteps,
  },
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
    //是否只读
    readonly: {
      type: Boolean,
      default: false,
    },
    //是否能删除
    isDel: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      submitData: "",
      selectBox: [],
      currentSelectIndex: "",
      currentSelectValue: "",
      codeFont: "获取验证码",
      wait: 60,
      activity: 0,
      wrapRecordList: [
        {
          updateTime: "2020-11-19 17:04:36",
          progressStatus: "4",
          content: "已到达目的地，本次服务结束！",
        },
        {
          updateTime: "2020-11-19 17:04:36",
          progressStatus: "3",
          content: "终于到家啦，回去睡觉！",
        },
        {
          updateTime: "2020-11-19 17:04:36",
          progressStatus: "2",
          content: "还有一半路程马上结束啦，换人来开！",
        },
        {
          updateTime: "2020-11-19 17:04:36",
          progressStatus: "1",
          content: "准备出发啦！一路顺风！",
        },
        {
          updateTime: "2020-11-19 17:04:36",
          progressStatus: "0",
          content: "开始啦",
        },
      ],
      progressStatus: [
        "开始",
        "准备出发",
        "到达服务区",
        "到达目的地",
        "已送达",
      ],
      isSend: false,
      isShow: false,
    };
  },
  computed: {
    fields: {
      get () {
        return this.value;
      },
      set (nval) {
        this.$emit("input", nval);
      },
    },
    form: {
      get () {
        return this.value.reduce((obj, item) => {
          item.formDataType &&
            (obj[item.formDataType] = item.__config__.defaultValue);
          return obj;
        }, {});
      },
    },
  },
  methods: {
    open () {
      // console.log('open');
    },
    close () {
      this.isShow = false;
      // console.log('close');
    },
    //删除图片
    deletePic (event, item) {
      item.__config__.regList.splice(event.index, 1);
      this.$emit("input", this.fields);
    },
    // 新增图片
    async afterRead (event, item) {
      const data = item
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      let lists = [].concat(event.file)
      let fileListLen = data.__config__.regList.length
      lists.map((item) => {
        data.__config__.regList.push({
          ...item,
          status: 'uploading',
          message: '上传中'
        })
      })
      for (let i = 0; i < lists.length; i++) {
        for (let i = 0; i < lists.length; i++) {
          uploadFile({
            url: lists[i].url,
            path: '上传文件测试',
          }).then(res => {
            this.$refs.uToast.show({
              type: 'success',
              message: "上传成功",
            });
            let item = data.__config__.regList[fileListLen]
            data.__config__.regList.splice(fileListLen, 1, Object.assign(item, {
              status: 'success',
              message: '',
              url: res.data
            }))
            fileListLen++
          })
        }
      }
      this.$emit("input", this.fields);
    },
    uploadFile (url) {
      uploadFile({ url: url, path: '上传文件测试' }).then((res) => {
        if (res.code == 0) {
          this.$refs.uToast.show({
            type: 'success',
            message: "上传成功",
          })
        } else {
          this.$refs.uToast.show({
            type: 'error',
            message: "上传失败",
          });
        }
      })
    },
    //显示select
    showSelect (item) {
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
    inputVal (index) {
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
    switchChange (index, item) {
      this.fields[index].formDataType = item;
      this.$emit("input", this.fields);
    },
    // 单选 下拉框点击确定
    selectConfirm ($event, item) {
      item.__slot__.label = $event.label;
      this.form[item.formDataType] = $event.label;
      item.__config__.show = false;
      this.$emit("input", this.fields);
    },
    selectClose (item) {
      item.__config__.show = false;
    },
    //单选 点击触发
    radioChange ($event, index) {
      this.$emit("input", this.fields);
    },
    //级联确定
    onConfirm ($event, item) {
      if ((item.type = "range")) {
        this.form[item.formDataType] = $event.result;
      } else {
        this.form[item.formDataType] = $event.value;
      }
      item.__config__.show = false;
      this.$emit("input", this.fields);
    },
    onCancel (item) {
      item.__config__.show = false;
      this.$emit("input", this.fields);
    },
    buttonClick (item) {
      if (item.__config__.tag == "el-button") {
        this.$emit("buttonClick", this.fields);
      }
    },
    //复选框 点击触发
    checkboxGroupChange ($event, item) {
      // console.log("$event", $event)
      const selectArr = item.__slot__.options.filter((v) =>
        $event.includes(v.name)
      ); //过滤
      // console.log("selectArr", selectArr)
      this.form[item.formDataType] = selectArr.map((v) => v.value);
      this.$emit("input", this.fields);
    },

    // 发送验证码
    sendCode (item) {
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
    $vervify () {
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
    $submitForm () {
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
    white-space: nowrap;
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
