<template>
  <view class="container">
    <Navbar :title="langText.pageTitle" />
    <u-toast ref="uToast"></u-toast>
    <view class="box-card">
      <view class="title1">工单信息</view>
      <view v-for="(item, i) in fields" :key="`fields${i}`" class="item">
        <view :class="item.tag === 'el-upload' ? 'title2' : 'title3'">{{ item.label }}</view>
        <!-- 上传样式 -->
        <template v-if="item.tag === 'el-upload'">
          <view v-for="(file, x) in item.value"  class="upload" :key="`upload${x}`">{{file.url}}</view>
        </template>
        <view v-else class="textCentent">{{ item.value }}</view>
      </view>
    </view>
    <view class="box-card" v-if="this.$route.query.index == 0">
      <u--form labelPosition="left" :model="form" :rules="rules" ref="form1">
        <!-- <u-form-item
					label="工单编号："
					prop="form.id"
          labelWidth="80"
			>
				<u--input
						v-model="form.name"
						border="none"
				></u--input>
			</u-form-item> -->
        <u-form-item label="审批人：" prop="user" labelWidth="80">
          <u--input v-model="form.user" placeholder="请输入审批人" border="none"></u--input>
        </u-form-item>
        <u-form-item label="审批意见：" :required=true prop="reason" labelWidth="100">
          <u--input v-model="form.reason" placeholder="请输入审批意见" border="none"></u--input>
        </u-form-item>
        <u-row customStyle="margin-bottom: 10px">
          <u-col span="10">
            <u-form-item label="上传附件：" :required=true labelWidth="80">
              <u-upload action :fileList="fileList" @afterRead="afterRead" @beforeRead="beforeRead" @delete="deletePic"
                :maxCount="10">
                <u-button size="small" type="primary" icon="arrow-upward" text="点击上传"></u-button>
              </u-upload>
              <u--text type="info" text="（最大10M）"></u--text>
            </u-form-item>
          </u-col>
        </u-row>
      </u--form>
    </view>
    <u-overlay :opacity="0.3" :show="showCancel">
      <view class="text-Box">

        <view class="text">
          <text class="text-item">提示</text>
          <text>此操作将取消签收该工单</text>
          <text>是否继续？</text>
          <view class="text-btn">
            <view @click="calltext()">取消</view>
            <view @click="calltext(true)">确定</view>
          </view>
        </view>
      </view>
    </u-overlay>
    <view class="btns" v-if="this.$route.query.index == 0">
      <view class="btn" @click="showCancel = true">取消签收</view>
      <view class="btn" @click="notsub">不通过</view>
      <view class="btn" @click="sub">通过</view>
    </view>
    <u-gap height="20rpx" />
  </view>
</template>

<script>
import { getToDoListDetail, getUnClaim } from "@/api/list.js";
import { getFrom } from "@/api/index.js";
import { getApprove, getBack, getReject, getInstanceId } from "@/api/approval.js";
import { uploadFile } from "@/api/file.js"
import Navbar from "@/components/navbar/navbar";
export default {
  name: "Order",
  components: { Navbar },
  data () {
    return {
      langText: {
        pageTitle: "工单详情",
      },
      count: 5,
      showCancel: false,
      fields: [],
      fileList: [],
      form: {
        id: this.$route.query.id,
        user: '',
        value: '',
        reason: ''
      },
      file: {},
      formData: {},
      dataForm: {},
      rules: {
      }
    }
  },
  onLoad () {
    this.getFrom();
  },
  computed: {
    hasLogin () {
      return this.$store.getters.hasLogin;
    },
  },
  methods: {
    loginOrJump (pageUrl) {
      if (!this.hasLogin) {
        uni.navigateTo({
          url: "/pages/login/login",
        });
      } else if (pageUrl) {
        uni.navigateTo({
          url: pageUrl,
        });
      }
    },
    getFrom () {
      getToDoListDetail({ id: this.$route.query.id || "" }).then((res) => {
        if (res.data) {
          this.getFormData(res.data.soWorkOrderDO)
          this.dataForm = res.data
        } else {
          return
        }

      });
    },
    getFormData (order) {
      getFrom({ id: order.formId }).then((res) => {
        if (!res.data || !res.data.fields) return
        res.data.fields.map(item => {
          item = JSON.parse(item)
          this.fields.push({
            tag: item.__config__ && item.__config__.tag,
            label: item.__config__ && item.__config__.label ? `${item.__config__.label}：` :  "",
            value: order[item.formDataType]
          })
        });
        // console.log(this.fields)
      })
    },
    //删除图片
    deletePic (event) {
      this[`fileList${event.name}`].splice(event.index, 1)
    },
    // 新增图片
    async afterRead (event) {
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      let lists = [].concat(event.file)
      let fileListLen = this[`fileList${event.name}`].length
      lists.map((item) => {
        this[`fileList${event.name}`].push({
          ...item,
          status: 'uploading',
          message: '上传中'
        })
      })
      for (let i = 0; i < lists.length; i++) {
        uploadFile({
          url: lists[i].url,
          path: '上传文件测试',
        }).then(res => {
          this.$refs.uToast.show({
            type: 'success',
            message: "上传成功",
          });
          let item = this[`fileList${event.name}`][fileListLen]
          this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
            status: 'success',
            message: '',
            url: res.data
          }))
          fileListLen++
        })
      }
    },
    calltext (call) {
      if (call) {
        getUnClaim({ taskId: this.$route.query.id }).then((res) => {
          this.$refs.uToast.show({
            type: 'success',
            message: "取消签收成功",
          });
          setTimeout(() => {
            this.loginOrJump('/pages/list/orderManage')
          }, 3000)
        });
      } else {
        this.showCancel = false
      }
    },
    notsub () {
      getInstanceId({ processInstanceId: this.dataForm.processInstanceId }).then((res) => {
        if (res.data.length == 1) {
          getReject(this.form).then((res) => {
            this.$refs.uToast.show({
              type: 'success',
              message: "不通过成功",
            });
            setTimeout(() => {
              this.form = {
                id: this.$route.query.id,
                user: '',
                value: '',
                reason: ''
              }
              this.loginOrJump('/pages/list/orderManage')
            }, 3000)
          });
        } else {
          this.formData.reason = this.form.reason
          this.formData.processInstanceId = res.data[0].processInstance.id
          this.formData.currentDefinitionKey = res.data[0].definitionKey
          this.formData.targetDefinitionKey = res.data[1].definitionKey
          this.formData.taskId = res.data[0].id
          this.formData.targetName = res.data[0].processInstance.name
          getBack(this.formData).then((res) => {
            this.$refs.uToast.show({
              type: 'success',
              message: "不通过成功",
            });
            setTimeout(() => {
              this.loginOrJump('/pages/list/orderManage')
            }, 3000)
          });
        }
      })

    },
    sub () {
      getApprove(this.form).then((res) => {
        this.$refs.uToast.show({
          type: 'success',
          message: "通过成功",
        });
        setTimeout(() => {
          this.loginOrJump('/pages/list/orderManage')
        }, 3000)
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  padding: 30rpx;
  box-sizing: border-box;
  font-family: PingFangSC-Regular, PingFang SC;

  .title1 {
    font-size: 31rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #272727;
    line-height: 31rpx;
    margin-bottom: 23rpx;
  }

  .title2,
  .title3,
  .textCentent {
    font-size: 29rpx;
    font-weight: 400;
    color: #333333;
    line-height: 29rpx;
  }

  .title3 {
    color: #999999;
  }

  .item {
    display: flex;
    flex-wrap: wrap;
    padding: 23rpx 0;
    align-items: center;

    .title2 {
      margin-right: 15rpx;
      white-space: nowrap;
    }

    .textCentent {
      min-width: 400rpx;
      flex: 1;
      display: flex;
      justify-content: flex-end;
    }

    .upload {
      width: 100%;
      padding: 10rpx 0;
      font-size: 25rpx;
      font-weight: 400;
      color: #007EFD;
      line-height: 35rpx;
    }

    .upload:nth-child(2) {
      margin-top: 23rpx;
    }

    .upload:last-child {
      padding-bottom: 0;
    }
  }

  .item:last-child {
    padding-bottom: 0;
  }
}

.subform {
  width: 719rpx;
}

.text-Box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  .text {
    width: 638rpx;
    background: #ffffff;
    border-radius: 21rpx;
    padding-top: 23rpx;
    font-size: 38rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 52rpx;
    text-align: center;
    overflow: hidden;

    text {
      display: block;
      margin-top: 23rpx;
    }

    .text-item {
      margin-bottom: 60rpx;
    }

    .text-btn {
      margin-top: 65rpx;
      background: #e0e0e0;
      font-size: 33rpx;
      font-family: MicrosoftYaHei;
      color: #333333;
      display: flex;
      height: 87rpx;

      view {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      view:last-child {
        background: #007efd;
        color: #ffffff;
      }
    }
  }
}
.btns {
  width: 719rpx;
  margin: 21rpx auto 0 !important;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  .btn {
    line-height: 83rpx;
    border-radius: 8rpx;
    font-size: 33rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    text-align: center;
    width: 229rpx;
  }
  .btn:nth-child(1) {
    background: #007EFD;
  }
  .btn:nth-child(2) {
    background: #FD7700;
  }
  .btn:nth-child(3) {
    background: #007EFD;
  }
}
</style>