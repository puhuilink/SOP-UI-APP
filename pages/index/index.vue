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
import { getList } from '@/api/index.js'
export default {
  name: 'index',
  components: {},
  data() {
    return {
      form:{
  dirId:79,
      },
      formId:{
        id:''
      },
      menuList: [
         { icon: '../../static/images/icon/问题反馈.png', title: '财务云问题反馈' },
        { icon: '../../static/images/icon/相关申请.png', title: '财务云相关申请' },
        { icon: '../../static/images/icon/堡垒机.png', title: '堡垒机申请' },
        { icon: '../../static/images/icon/问题变更.png', title: '系统变更申请' },
         { icon: '../../static/images/icon/视频会议.png', title: '总部视频会议' },
          { icon: '../../static/images/icon/访问权限.png', title: '访问权限申请' },
          ],
      Listdata :[],
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
        //路由跳转携带参数
        wx.navigateTo({
          url: '/pages/info/test'
        })
      } else if (name == 2) {
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
          getList().then(res => {
          this.Listdata =res.data.list
          for(var i=0;i<this.Listdata.length;i++){
            this.menuList[i].title = this.Listdata[i].label
          }    
      })
        },
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
