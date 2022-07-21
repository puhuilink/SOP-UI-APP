<template>
    <view class="content">
        <active-form v-model="fields" num></active-form>

        <view class="subform" @click="sub">提交表单</view>
    </view>
</template>

<script>
import ActiveForm from "@/components/active-form/active-form";
import { getFrom } from '@/api/index.js'
export default {
  name:'Form',
    components: {
        ActiveForm,
    },
    data() {
        return {
        fields:[],
          formIds:{
        id:'165'
      },
        };
    },
     onLoad() {
    this.getFrom()
  },
      mounted() {
    window.addEventListener("message", (event) => {
      const data = event.data;
      switch (data.type) {
        case "formData":
          // 业务逻辑
          this.type = data.type;
          this.fields = JSON.parse(data.data);
          break;
      }
    });
  },
    methods: {
        // 提交表单
        sub() {
            this.$refs.activeForm.$vervify(this.formData); //表单校验 成功会继续往下走 失败抛出异常
            const res = this.$refs.activeForm.$submitForm(this.formData); //校验成功 获取表单值
            console.log('表单对象 :>> ', res);
        },
           getFrom(){
          getFrom(this.formIds).then(res => {
             for(var i=0;i<res.data.fields.length;i++){
             this.fields.push(JSON.parse(res.data.fields[i])) 
          }    
          })
        }
    },
};
</script>

<style lang="less">

    .subform {
       display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
        margin: 30rpx;
        padding: 20rpx 60rpx;
        border-radius: 18rpx;
        background-color: bisque;
    }
</style>