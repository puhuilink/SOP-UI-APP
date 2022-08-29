<template>
  <view class="container">
     <Navbar :title="langText.pageTitle" />
      <u-toast ref="uToast"></u-toast>
  <view class="box-card">
    <view>工单信息</view>
     <view class="form-box">
      <active-form ref="activeForm" v-model="fields" :readonly="true" />
    </view>
  </view>
    <view class="box-card">
    <u--form
				labelPosition="left"
				:model="form"
				:rules="rules"
				ref="form1"
		>
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
      <u-form-item
						label="审批人："
						prop="user"
            labelWidth="80"
					>
				<u--input
						v-model="form.user"
            placeholder="请输入审批人"
						border="none"
				></u--input>
					</u-form-item>
            <u-form-item
					label="审批意见："
           :required=true
					prop="reason"
          labelWidth="100"
			>
				<u--input
						v-model="form.reason"
            placeholder="请输入审批意见"
						border="none"
				></u--input>
			</u-form-item>
         <u-row customStyle="margin-bottom: 10px">
           <u-col span="10">
           <u-form-item
					label="上传附件："
          :required=true
          labelWidth="80"
			>
      <u-upload
		:fileList="fileList"
		@afterRead="afterRead"
    @beforeRead="beforeRead"
		@delete="deletePic"
		:maxCount="10"
	>
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
    <u-row  justify="space-between"
        gutter="10">
      <u-col span="4">
        <u-button  type="primary" shape="circle" text="取消签收" @click="showCancel=true"></u-button>
      </u-col>
       <u-col span="4">
        <u-button type="warning" shape="circle" @click="notsub" text="不通过"></u-button>
      </u-col>
       <u-col span="4">
        <u-button  type="primary" shape="circle" @click="sub" text="通过"></u-button>
      </u-col>
    </u-row>
  </view >
</template>

<script>
import { getToDoListDetail,getUnClaim } from "@/api/list.js";
import { getFrom } from "@/api/index.js";
import { getApprove,getReject} from "@/api/approval.js";
import {uploadFile} from "@/api/file.js"
import Navbar from "@/components/navbar/navbar";
import ActiveForm from "@/components/active-form/active-form";
export default {
    name: "Order",
 components: { Navbar,ActiveForm },
 data() {
   return {
     langText: {
       pageTitle: "工单详情",
     },
     count: 5,
     showCancel:false,
      fields: [],
      fileList:[],
     form:{
      id:this.$route.query.id,
      user:'',
      value:'',
      reason:''
      },
      file:{},
      dataForm:{},
      rules:{
      }
     }
   },
     onLoad() {
    this.getFrom();
  },
   computed: {
    hasLogin() {
      return this.$store.getters.hasLogin;
    },
  },
   methods:{
        loginOrJump(pageUrl) {
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
        getFrom() {
      getToDoListDetail({ id: this.$route.query.id || "" }).then((res) => {
             if(res.data){
				 this.getFormData(res.data.soWorkOrderDO)
				 this.dataForm = res.data
			 }else{
				 return
			 }
       
      });
    },
	getFormData(data){
		getFrom({id:data.formId}).then((res) => {
		  for (var i = 0; i < res.data.fields.length; i++) {
                let item = JSON.parse(res.data.fields[i]);
		    // 工单、记录时间、优先级是系统自动生成的所以不用展示
		    let notShow = ["workOrderId", "recordedTime", "priority"];
		    if (!notShow.includes(item.formDataType)) {
		      this.fields.push(item);
          this.filter()
		    }
		  } 
		})
	},
  filter(){
        this.fields.reduce((obj, item) => {
          console.log();
          item.formDataType &&
            (item.__config__.defaultValue =this.dataForm.soWorkOrderDO[item.formDataType]);
          return obj;
        }, {});
  },
  	// 删除文件
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增文件
      afterRead(file){
        this.file = file.file
          const fileSuffix = this.file.name.substring(this.file.name.lastIndexOf('.') + 1)
         if (fileSuffix !== 'png') {
                  uni.showToast({
                    title: "只能上传图片",
                    duration: 2000,
                    icon: "none",
                  })
               return
                  // throw Error(); //终止函数
                }
               if (this.file.size / 1024 / 1024 > 10) {
                  uni.showToast({
                    title: "文件大小不能超过10M",
                    duration: 2000,
                    icon: "none",
                  })
                return
                  // throw Error(); //终止函数
                }
                this.uploadFile()    
      },
      uploadFile(){
        uploadFile( this.file ).then((res) => {
          //上传文件待处理接口返回数据，接口好像有问题
          	setTimeout(() => {
							console.log(res);
							}, 1000)
        })
      },
        calltext(call) {
      if (call) {
          getUnClaim({ taskId: this.$route.query.id  }).then((res) => {
         this.$refs.uToast.show({
            type: 'success',
            message: "取消签收成功",
                  });
                  setTimeout(() => {
							 this.loginOrJump('/pages/list/orderManage')
							}, 3000)   
      });
      }else{
        this.showCancel = false
      }
    },
   notsub(){
     getReject(this.form).then((res) => {
          this.$refs.uToast.show({
            type: 'success',
            message: "不通过成功",
                  });
                  setTimeout(() => {
						 this.loginOrJump('/pages/list/orderManage')
							}, 3000)  
      });
  },
  sub() {
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
    .text-item{
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
</style>