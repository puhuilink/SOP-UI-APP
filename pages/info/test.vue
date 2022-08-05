<template>
  <view class="content">
    <Navbar :title="'表单'" />
    <active-form ref="activeForm" v-model="fields" num></active-form>
    <view class="subform" @click="sub">提交表单</view>
  </view>
</template>

<script>
import Navbar from "@/components/navbar/navbar";
import ActiveForm from "@/components/active-form/active-form";
import { getFrom, getCreate } from "@/api/index.js";
export default {
  name: "Form",
  components: {
    Navbar,
    ActiveForm,
  },
  data() {
    return {
      fields: [],
    };
  },
  onLoad() {
    this.getFrom();
  },
  mounted() {
    window.addEventListener("message", (event) => {
      const data = event.data;
      switch (data.type) {
        case "formData": // 业务逻辑
          this.type = data.type;
          this.fields = JSON.parse(data.data);
          break;
      }
    });
  },
  methods: {
    // 提交表单
    sub() {
      this.$refs.activeForm
        .$vervify()
        .then(async (form) => {
          //取消obj属性的所有下划线，没有下划线则跳过
          getCreate(form).then((res) => {
            uni.$u.toast("创建工单成功");
             setTimeout(() => {
            uni.navigateTo({
              url: "/pages/list/Todolist",
            });
          }, 300);
          });
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    getFrom() {
      getFrom(this.$route.query).then((res) => {
        console.log(res)
        for (var i = 0; i < res.data.fields.length; i++) {
          this.fields.push(JSON.parse(res.data.fields[i]));
        }
      });
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