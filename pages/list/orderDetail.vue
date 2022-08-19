<template>
  <view class="container">
     <Navbar :title="langText.pageTitle" />
  <view class="box-card">
    <u--form
				labelPosition="left"
				:model="form"
				:rules="rules"
				ref="form1"
		>
    <u-form-item
					label="工单编号："
					prop="form.id"
          labelWidth="80"
			>
				<u--input
						v-model="form.name"
						border="none"
				></u--input>
			</u-form-item>
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
  <view class="box-card">
    <view>工单详情</view>
     <view class="form-box">
      <active-form ref="activeForm" v-model="fields" />
    </view>
  </view>
  </view >
</template>

<script>
import { getToDoListDetail } from "@/api/list.js";
import Navbar from "@/components/navbar/navbar";
import ActiveForm from "@/components/active-form/active-form";
export default {
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
        console.log(res);
        // for (var i = 0; i < res.data.fields.length; i++) {
        //   this.fields.push(JSON.parse(res.data.fields[i]));
        // }
      });
    },
   }
}
</script>

<style>

</style>