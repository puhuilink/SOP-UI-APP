<template>
  <view class="container">
     <Navbar :title="langText.pageTitle" />
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
    <u-row  justify="space-between"
        gutter="10">
      <u-col span="4">
        <u-button  type="primary" shape="circle" text="取消签收" @click="cancel"></u-button>
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
  	// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
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
          	setTimeout(() => {
							console.log(res);
							}, 1000)
        })
      },
  cancel(){
     getUnClaim({ taskId: this.$route.query.id  }).then((res) => {
         this.$refs.uToast.show({
            type: 'success',
            message: "取消签收成功",
                  });
                  setTimeout(() => {
							 this.loginOrJump('/pages/list/orderManage')
							}, 3000)   
      });
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

<style lang="less">
.subform {
  width: 719rpx;
}
</style>