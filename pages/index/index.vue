<template>
  <view class="container">
     <view class="group9 flex-col">
     <view class="block3">
        <text class="word1">IT服务运营管理平台</text>        
      </view> 
      <view>
             <!--消息滚动栏-->
             <fui-card radius="5%" :padding="['20rpx','32rpx']" src="../../static/images/icon/消息.png" title="工单" tag="上午11:30">
		<view class="fui-card__content">您有一个新的工单待接收，请及时处理</view>
</fui-card>
      </view>
      </view>

    <u-gap height="30px"></u-gap>
    <!--宫格菜单按钮-->
    <view class="title">自助工单</view>
    <u-grid :border="false" col="4" @click="click">
      <u-grid-item v-for="(item, index) in menuList" :key="index">
      <u-image :src="item.icon" width="46px" height="46px"> 
                        </u-image>
        <text class="grid-title">{{ item.title }}</text>
      </u-grid-item>
    </u-grid>
    <u-gap height="15px"></u-gap>
  </view>
</template>

<script>
import { getList,getByDir } from '@/api/index.js'
export default {
  name: 'index',
  components: {},
  data() {
    return {
      form:{
  dirId:'',
      },
      formId:{
        id:''
      },
      menuList: [],
      noticeList:'您有一个新的工单待接收，请及时处理',
    }
  },
  onLoad() {
  },
  onLoad() {
    this.getList()
  },
  methods:{
     click(name) {
      //根据点击进行不同跳转
      if (name == 0) {
        wx.navigateTo({
          url: '/pages/info/info'
        })
      } else if (name == 1) {
        //H5页面跳转动态拼接参数
        wx.navigateTo({
          url: '/pages/info/test?id=' + this.formId.id
        })
      } else if (name == 2) {
        //将formId传递给下一个页面
     
        wx.navigateTo({
          url: '/pages/info/info'
        })
      } else if (name == 3) {
        wx.navigateTo({
          url: '/pages/info/info'
        })
      } else if (name == 4) {
        wx.navigateTo({
          url: '/pages/info/info'
        })
      } else if (name == 5) {
        wx.navigateTo({
          url: '/pages/info/info'
        })
      }
			},
  async   getList(){
      await    getList().then(res => {
              this.form.dirId =  res.data.list[0].id    
          this.menuList =res.data.list
          //将this.menuList的label替换为title
          for(var i=0;i<this.menuList.length;i++){
            this.menuList[i].title = this.menuList[i].label
          }  
      })
      this.getByDir()
        },
       getByDir(){
          getByDir(this.form).then(res => {
            this.formId.id = res.data.formId
          })
        }
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
.group9 {
  height: 179px;
  background: url(../../static/images/icon/head-bg.png) no-repeat;
  position: relative;
	size:100%;
}
.block3 {
  height: 30px;
  margin: 47px 0 20px 16px;
}
.word1{
  font-size: 20px;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  line-height: 30px;
}
.grid-title {
  line-height: 100rpx;
  font-size: 26rpx;
}
.title{
font-size: 15px;
	padding: 0rpx 20rpx 10px 20px;
font-family: PingFangSC-Semibold, PingFang SC;
font-weight: 600;
color: #333333;
line-height: 21px;
}
.fui-card__content {
		font-size: 28rpx;
		padding: 32rpx 20rpx 10px 20px;
height: 14px;
font-size: 14px;
font-family: PingFangSC-Regular, PingFang SC;
font-weight: 400;
color: #68696D;
line-height: 14px;
	}
</style>
