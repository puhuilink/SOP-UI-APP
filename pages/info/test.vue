<template>
    <view class="content">
       <u-navbar
            title="表单"
            :autoBack="true"
        > 
        </u-navbar>
        <active-form ref="activeForm" v-model="fields" num></active-form>
        <view class="subform" @click="sub">提交表单</view>
    </view>
</template>

<script>
import ActiveForm from "@/components/active-form/active-form";
import { getFrom,getCreate } from '@/api/index.js'
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

            this.$refs.activeForm.$vervify()
            .then(async (form) => {
         //取消obj属性的所有下划线，没有下划线则跳过
          Object.keys(form).forEach(key => {
            if (key.indexOf("_") > -1) {
              form[key.replace(/_/g, "")] = form[key];
              delete form[key];
            }
          });
                getCreate(form).then(res=>{
            console.log(res);
            })
            })
            .catch((err) => {
               console.log("err", err);
            });
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