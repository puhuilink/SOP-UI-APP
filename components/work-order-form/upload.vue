<template>
  <view class="container">
    <view class="label">
      <text class="colorRed" v-if="config.__config__.label">*</text>
      <text>{{ `${config.__config__.label}：` }}</text>
    </view>
    <u--form :model="form" :rules="rules" ref="upload">
      <u-form-item prop="val">
        <uni-file-picker ref="upFile" :disabled="config.disabled" :value="form.val"
          :file-mediatype="'config.accept' || all" @delete="deletePic" @select="select" auto-upload @fail="fail"
          mode="grid">
          <view class="upBox">
            <view class="btn">
              <img src="/static/images/icon/icon_download.png" />
              <text>{{ config.__config__.buttonText }}</text>
            </view>
            <text class="fileSize">最大{{ config.__config__.fileSize }}mb</text>
          </view>
        </uni-file-picker>
      </u-form-item>
    </u--form>
  </view>
</template>

<script>
import { uploadFile } from "@/api/file.js";
export default {
  name: "upload",
  props: {
    value: {
      type: Object | Array,
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
  data () {
    return {
      form: {
        val: [],
      },
      rules: {
        val: [
          {
            type: "array",
            required: false,
            message: "",
          },
        ],
      },
    };
  },
  computed: {},
  watch: {
    config: {
      handler: function (val) {
        if (val.__config__) {
          if (val.__config__.required) {
            this.rules.val[0].required = val.__config__.required;
          }
          if (val.__config__.label) {
            this.rules.val[0].message = `请上传${val.__config__.label}`;
          }
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created () { },
  mounted () { },
  methods: {
    // 获取上传状态
    select (e) {
      this.uploadFile(e.tempFiles, 0);
      let index = this.form.val.length > 0 ? this.form.val.length - 1 : 0;
      let long = this.$refs.upFile.files.length - this.form.val.length;
      this.$refs.upFile.files.splice(index, long);
    },
    uploadFile (files, i) {
      if (!files[i]) return;
      let file = files[i];
      let { size, extname, name, url } = file;
      if (size > 1024 * 1024) {
        uni.$u.toast(`${name}文件超出${this.config.__config__.fileSize}mb`);
        setTimeout(() => {
          this.uploadFile(files, ++i);
        }, 2500);
        return;
      }
      uploadFile({
        url,
        path: name,
      })
        .then((res) => {
          if (!res.data) return;
          this.form.val.push({
            url: res.data,
            extname,
            name,
          });
          this.$emit("input", this.form.val);
          this.uploadFile(files, ++i);
          this.$refs.upFile.push(file)
        })
        .catch(() => {
          this.uploadFile(files, ++i);
        });
    },
    deletePic (e) {
      let index = this.form.val.findIndex((item) => {
        return (item.path = e.tempFilePath);
      });
      this.form.val.splice(index, 1);
      console.log(this.form.val);
    },
    vervify (callBack) {
      this.$refs.upload
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
}

.label {
  line-height: 90rpx;
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

.upBox {
  line-height: 63rpx;
  display: flex;

  .btn {
    width: 246rpx;
    height: 63rpx;
    background: #f5f5f5;
    border-radius: 8rpx;
    border: 2rpx solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #227fe6;
    margin-right: 17rpx;

    img {
      width: 25rpx;
      height: 25rpx;
      display: block;
      margin-right: 13rpx;
    }
  }

  .fileSize {
    font-size: 25rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
  }
}
</style>
