<template>
  <view class="container">
     <Navbar :title="langText.pageTitle" />

  <view class="box-card">
    <view>工单详情</view>
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
						label="用户验证："
        :required=true
						prop="form.user"
            labelWidth="80"
					>
						<u-radio-group v-model="form.user">
							<u-radio
								:customStyle="{marginRight: '16px'}"
								v-for="(item, index) in radiolist"
								:key="index"
								:label="item.name"
								:name="item.name"
							>
							</u-radio>
						</u-radio-group>
					</u-form-item>
            <u-form-item
					label="未解决原因："
           :required=true
					prop="form.why"
          labelWidth="100"
			>
				<u--input
						v-model="form.why"
            placeholder="请输入未解决原因"
						border="none"
				></u--input>
			</u-form-item>
           <u-form-item
					label="满意度："
          :required=true
					prop="form.id"
          labelWidth="80"
			>
				<u-rate :count="count" v-model="form.value"></u-rate>
			</u-form-item>
    </u--form>
  </view>
    <u-button  class="subform" type="primary" text="提交" @click="sub" />
  </view >
</template>

<script>
import { getToDoListDetail } from "@/api/list.js";
import { getFrom } from "@/api/index.js";

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
     form:{
      id:'',
      user:'',
      value:'',
      why:''
      },
      dataForm:{},
   radiolist: [{
						name: '已解决',
						disabled: false
					},
					{
						name: '未解决',
						disabled: false
					}
				],
      rules:{
        user: [
          { required: true, message: '请选择用户验证', trigger: 'blur' }
        ],
        value: [
          { required: true, message: '请选择满意度', trigger: 'blur' }
        ],
        why: [
          { required: true, message: '请输入未解决原因', trigger: 'blur' }
        ]
      }
     }
   },
     onLoad() {
    this.getFrom();
  },
   methods:{
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
  }
   }
}
</script>

<style lang="less">
.subform {
  width: 719rpx;
}
</style>