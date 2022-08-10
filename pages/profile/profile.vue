<template>
  <view class="container">
    <Navbar :title="'设置'" />
    <view class="user-info">
      <view class="info-item">
        <view class="label">{{langText.avatar}}：</view>
        <view class="info" @click="handleAvatarClick">
          <u-avatar size="60" :src="userInfo.avatar"></u-avatar>
          <u-icon class="btn" name="arrow-right"></u-icon>
        </view>
      </view>
      <view class="info-item">
        <view class="label">{{langText.nickname}}：</view>
        <view v-if="!nameEditOn" class="info">
          <view class="value">{{ userInfo.nickname }}</view>
          <u-icon
            class="btn"
            name="edit-pen"
            @click="
              tempName = userInfo.nickname;
              nameEditOn = true;
            "
          ></u-icon>
        </view>
        <view v-else class="name-edit">
          <u--input
            maxlength="10"
            border="bottom"
            v-model="tempName"
          ></u--input>
          <view class="edit-btn-group">
            <u-tag
              class="edit-btn"
              text="保存"
              plain
              size="mini"
              type="primary"
              @click="handleSaveBtnClick"
            ></u-tag>
            <u-tag
              class="edit-btn"
              text="取消"
              plain
              size="mini"
              type="info"
              @click="
                tempName = '';
                nameEditOn = false;
              "
            ></u-tag>
          </view>
        </view>
      </view>
      <view class="info-item">
        <view class="label">{{langText.language}}：</view>
        <view class="info" @click="language.show = true">
          <u-picker
            :show="language.show"
            :columns="language.columns"
            keyName="label"
            @confirm="changeLanguage"
            @cancel="language.show = false"
          />
          <view class="value">{{ language.active.label }}</view>
          <u-icon class="btn" name="arrow-right" />
        </view>
      </view>
    </view>
    <view v-if="hasLogin" class="logout-btn">
      <u-button
        type="error"
        color="#ea322b"
        text="退出登录"
        @click="logout"
      ></u-button>
    </view>
  </view>
</template>

<script>
import Navbar from "@/components/navbar/navbar";
import { updateAvatar, updateNickname } from "../../api/user";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      avatarFiles: [],
      nameEditOn: false,
      tempName: "",
      language: {
        active: {
          label: "中文",
          value: "zh-CN",
        },
        index: 0,
        show: false,
        columns: [
          [
            {
              label: "中文",
              value: "zh-CN",
            },
            {
              label: "英文",
              value: "zh-US",
            },
          ],
        ],
      },
    };
  },
  computed: {
    userInfo() {
      return {
        nickname: "",
        avatar: "",
        ...this.$store.getters.userInfo,
      };
    },
    hasLogin() {
      return this.$store.getters.hasLogin;
    },
    langText() {
      return this.$t("profile");
    },
  },
  onLoad() {
    // 同步语言设置
    let languageActive = localStorage.getItem('language') ? localStorage.getItem('language') : 'zh-CN'
    let index= this.language.columns[0].findIndex(item  =>  {
      return item.value === languageActive
    })
    if (this.language.columns[0][index]) {
      this.language.active = this.language.columns[0][index]
      this.language.index = [index]
    }
  },
  methods: {
    handleAvatarClick() {
      uni.chooseImage({
        success: (chooseImageRes) => {
          this.getBase64(chooseImageRes.tempFiles[0], (img) => {
            updateAvatar({
              file: img,
            }).then((res) => {
              this.userInfo.avatar = res.data;
              this.$store.commit("SET_USER_INFO", this.userInfo);
            });
          });
        },
      });
    },
    getBase64(img, callback) {
      let reader = new FileReader();
      reader.addEventListener("load", () => callback(reader.result));
      reader.readAsDataURL(img);
    },
    handleSaveBtnClick() {
      updateNickname({ nickname: this.tempName }).then((res) => {
        this.nameEditOn = false;
        this.userInfo.nickname = this.tempName;
        this.$store.commit("SET_USER_INFO", this.userInfo);
      });
    },
    changeLanguage(data) {
      let { value } = data;
      this.language.active = value[0];
      this.language.show = false;
      this._i18n.locale = this.language.active.value;
      localStorage.setItem("language", this.language.active.value);
    },
    logout() {
      uni.showModal({
        title: "提示",
        content: "您确定要退出登录吗",
        success: (res) => {
          if (res.confirm) {
            this.$store.dispatch("Logout");
          }
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-info {
  .info-item {
    padding: 20rpx 60rpx;
    border-bottom: $custom-border-style;
    @include flex-space-between;
    .label {
      font-size: 30rpx;
    }
    .info {
      @include flex-right;
      .value {
        font-size: 30rpx;
      }
      .btn {
        margin-left: 30rpx;
      }
    }
    .name-edit {
      @include flex-left;
      .edit-btn-group {
        @include flex;
        .edit-btn {
          margin-left: 20rpx;
        }
      }
    }
  }
}
.logout-btn {
  margin: 60rpx auto 0;
  width: 400rpx;
}
</style>
