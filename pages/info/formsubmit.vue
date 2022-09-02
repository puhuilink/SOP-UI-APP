<template>
  <view class="content">
    <Navbar v-if="!pcFrom" :title="pageTitle" />
    <view class="form-box">
      <work-order-form ref="workOrderForm" :fields="fields" />
    </view>
    <u-button
      v-if="!pcFrom"
      class="subform"
      type="primary"
      text="提交表单"
      @click="sub"
      :loading="loading"
    />
    <u-gap height="80rpx" />
  </view>
</template>

<script>
import Navbar from "@/components/navbar/navbar";
import workOrderForm from "@/components/work-order-form/index";
import { getFrom, getCreate } from "@/api/index.js";
export default {
  name: "Form",
  components: {
    Navbar,
    // ActiveForm,
    workOrderForm,
  },
  data() {
    return {
      loading: false,
      pageTitle: this.$route.query.title || "",
      fields: [],
      parames: {
        prefix: this.$route.query.prefix || "",
        processKey: this.$route.query.processKey || "",
        formId: this.$route.query.id,
        approvalDocument: "",
        associateWorkOrder: "",
        degreeOfInfluence: "",
        expectedCompletionTime: "",
        operationRecord: "",
        owningModule: "",
        owningSystem: "",
        priority: "",
        recorder: "",
        recorderDept: "",
        serviceRequestClassification: "",
        serviceRequestDetails: "",
        serviceRequestSource: "",
        title: "",
        urgency: "",
        userContactDetails: "",
        userDept: "",
        userName: "",
        workOrderId: "",
      },
      pcFrom: this.$route.query.pcFrom,
    };
  },
  onLoad() {
    if (!this.pcFrom) {
      this.getFrom();
    }
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
      this.$refs.workOrderForm.vervify((form) => {
        if (!form) return;
        this.loading = true;
        getCreate({ ...this.parames, ...form })
          .then((res) => {
            this.loading = false;
            uni.$u.toast("创建工单成功");
            setTimeout(() => {
              uni.redirectTo({
                url: "/pages/index/index",
              });
            }, 300);
          })
          .catch(() => {
            uni.$u.toast("创建工单失败");
            this.loading = false;
          });
      });
    },
    getFrom() {
      getFrom({ id: this.$route.query.id || "" }).then((res) => {
        for (var i = 0; i < res.data.fields.length; i++) {
          let item = JSON.parse(res.data.fields[i]);
          item.formDataType && this.fields.push(item);
        }
      });
    },
  },
};
</script>

<style lang="less">
.form-box {
  width: 719rpx;
  background: #ffffff;
  margin: 20rpx auto 20rpx;
  box-sizing: border-box;
  border-radius: 21rpx;
}
.subform {
  width: 719rpx;
}
</style>