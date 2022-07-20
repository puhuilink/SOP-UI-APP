<template>
  <view class="container">
     <view class="group9 flex-col">
     <view class="block3">
        <text class="word1">IT服务运营管理平台</text>        
      </view> 
      <view>
             <!--消息滚动栏-->
  <u-notice-bar :text="noticeList" mode="closable" speed="100"  ></u-notice-bar>
      </view>
      </view>

    <u-gap height="30px"></u-gap>
    <!--宫格菜单按钮-->
    <u-grid :border="false" col="4" @click="click"
      ><u-grid-item v-for="(item, index) in menuList" :key="index">
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
      menuList: [
        { icon: '../../static/images/icon/问题反馈.png', title: '' },
        { icon: '../../static/images/icon/相关申请.png', title: '' },
        { icon: '../../static/images/icon/堡垒机.png', title: '' },
        { icon: '../../static/images/icon/问题变更.png', title: '' },
         { icon: '../../static/images/icon/视频会议.png', title: '' },
          { icon: '../../static/images/icon/访问权限.png', title: '' },
      ], 
      Listdata :[],
      noticeList:'您有一个新的工单待接收，请及时处理',
    }
  },
  onLoad() {
  },
  methods: {
    click(name) {
      //根据点击进行不同跳转
      if (name == 0) {
        wx.navigateTo({
          url: '/pages/info/info'
        })
      } else if (name == 1) {
        wx.navigateTo({
          url: '/pages/info/info'
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
			}
  },
  onLoad() {
    this.getList()
  },
  methods:{
        getList(){
          getList().then(res => {
          this.Listdata =res.data.list
          for(var i=0;i<this.Listdata.length;i++){
            this.menuList[i].title = this.Listdata[i].label
          }    
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


</style>
