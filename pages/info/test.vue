<template>
    <view class="content">
        <active-form v-model="fields" num></active-form>

        <view class="subform" @click="sub">提交表单</view>
    </view>
</template>

<script>
import ActiveForm from "@/components/active-form/active-form";

export default {
    components: {
        ActiveForm,
    },
    data() {
        return {
		 "fields": [{
    "__config__": {
      "label": "记录人",
      "labelWidth": null,
      "showLabel": true,
      "changeTag": true,
      "tag": "el-input",
      "tagIcon": "listicon_03",
      "defaultValue": "admin",
      "required": true,
      "layout": "defaultData",
      "span": 24,
      "show": false,
      "fixedType": "username",
      "document": "https://element.eleme.cn/#/zh-CN/component/input",
      "regList": [],
      "formId": 103,
      "renderKey": "1031657783621672"
    },
    "__slot__": {
      "prepend": "",
      "append": ""
    },
    "placeholder": "请输入记录人",
    "style": {
      "width": "100%"
    },
    "clearable": true,
    "prefix-icon": "",
    "suffix-icon": "",
    "maxlength": null,
    "show-word-limit": false,
    "readonly": false,
    "disabled": false,
    "tableColumn": "user_name",
    "__vModel__": "field103"
  }, {
    "__config__": {
      "label": "工单编号",
      "labelWidth": null,
      "showLabel": true,
      "changeTag": true,
      "tag": "el-input",
      "tagIcon": "listicon_01",
      "required": true,
      "layout": "text",
      "span": 24,
      "show": false,
      "document": "https://element.eleme.cn/#/zh-CN/component/input",
      "value": "系统自动生成",
      "formId": 104,
      "renderKey": "1041657783622285"
    },
    "placeholder": "系统自动生成工单编号",
    "style": {
      "width": "100%"
    },
    "clearable": true,
    "prefix-icon": "",
    "suffix-icon": "",
    "maxlength": null,
    "show-word-limit": false,
    "readonly": false,
    "disabled": false,
    "tableColumn": "work_order_id"
  }],
        };
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