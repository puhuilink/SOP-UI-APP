<template>
  <view class="container">
     <Navbar :title="langText.pageTitle" />
    <u-sticky bgColor="#fff">
      <u-tabs
        :list="msgState.list"
        :scrollable="false"
        :current="msgState.index"
        @change="changeMsgState"
        lineHeight="6rpx"
        lineWidth="58rpx"
        lineColor="#007EFD"
        itemStyle="height: 96rpx"
        inactiveStyle="color: #666666"
        activeStyle="color: #007EFD"
      />
      <view class="search-box">
        <u-search
          placeholder="请输入关键字"
          bgColor="#fff"
          placeholderColor="#999999"
          :show-action="false"
          searchIconColor="#000"
          height="75rpx"
          shape="square"
          :inputStyle="{ padding: '0 30rpx' }"
          v-model="keyword"
          @change="search"
          @clickIcon="search"
        />
      </view>
    </u-sticky>
    <u-list>
      <u-list-item v-for="(item, index) in testData" :key="index" >
        <u-row>
          <u-col span="12">
            <view class="time"></view>
          </u-col>
        </u-row>
        <view class="list-item">
            <view class="title">
            <u-tag :text="item.text" :type="item.type" plain size="mini" class="tag"> </u-tag>
            <view>{{item.title}}</view>
          </view>
          <view class="account">
            <view class="account-box">
              <view class="account-text">{{item.author_name}}</view>
            </view>
            <view class="account-box">
              <view class="account-text">{{item.name}}</view>
            </view>
          </view>
          <view class="record">  
           <view>
            <img src="/static/images/icon/icon_dingdan.png" class="record-img"/>
             {{item.id}}
             </view>  
          <view>
            <img src="/static/images/icon/icon_time.png" class="record-img"/>
            {{item.time}}
            </view>
          </view>
        </view>
      </u-list-item>
    </u-list>
  </view>
</template>

<script>
import uTabs from "../../uni_modules/uview-ui/components/u-tabs/u-tabs.vue";
import Navbar from "@/components/navbar/navbar";
import { getToDoList,getHaveDoList } from "@/api/list.js";
export default {
  components: { uTabs,Navbar },
  data() {
    return {
      keyword: "",
       loading: false,
          // 每页数据量
      pageSize: 10,
      // 当前页
      pageNo: 1,
      // 数据总量
      total: 0,
      msgState: {
        index: this.$route.query.type || 0,
        list: [
          {
            name: "待办",
             badge: {
                        value: 5,
                    }
          },
          {
            name: "已办",
          },
            {
            name: "我管理的",
          },
        ],
      },
      listData:[],
      testData: [
        {
          id: "S20220531199",
          title: "财务账号问题",
          author_name: "二线人员王明已处理",
          name: "记录人：高得",
          published_at: "2022-07-22 08:19",
          time:'2022-08-10',
          type: "error",
          text:'P1'
        },
        {
          id: "S20220531199",
          title: "财务账号问题",
          author_name: "二线人员王明已处理",
          name: "记录人：李雷",
          published_at: "2022-07-23 08:19",
           time:'2022-08-10',
          text:'P2'
        },
        {
          id: "S20220531199",
          title: "财务账号问题",
          author_name: "二线人员王明已处理",
          name: "记录人：王露",
          published_at: "2022-07-24 08:19",
           time:'2022-08-10',
           type: "success",
          text:'P3'
        },
        {
          id: "S20220531199",
          title: "财务账号问题",
          author_name: "二线人员王明已处理",
          name: "记录人：高得",
          published_at: "2022-07-25 08:19",
           time:'2022-08-10',
          text:'P2'
        },
      ],
    };
  },
    computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    },
    hasLogin() {
      return this.$store.getters.hasLogin;
    },
    langText() {
      return this.$t("message");
    },
  },
    onLoad() {
    this.getlist();
  },
  methods: {
  async  getlist() {
    //根据this.$route.query.type获取数据
    let type = this.$route.query.type;
    
    if (type == 0) {
      await getToDoList(this.pageNo, this.pageSize).then(res => {
        this.listData = res.data.list;
          this.listData.forEach((item,index) => {
          // 添加text属性，值为P1依次往后加
          item.text = "P" + (index + 1);
          item.time = this.formatDate(item.createTime);
        });
        this.total = res.data.total;
      });
    } else if (type == 1) {
      await getHaveDoList(this.pageNo, this.pageSize).then(res => {
        this.listData = res.data.list;
          this.listData.forEach((item,index) => {
          // 添加text属性，值为P1依次往后加
          item.text = "P" + (index + 1);
          item.time = this.formatDate(item.createTime);
        });
        this.total = res.data.total;
      });
    } else {
      //我管理的暂无接口，使用已办接口
      await getHaveDoList(this.pageNo, this.pageSize).then(res => {
        this.listData = res.data.list;
          this.listData.forEach((item,index) => {
          // 添加text属性，值为P1依次往后加
          item.text = "P" + (index + 1);
          item.time = this.formatDate(item.createTime);
        });
        this.total = res.data.total;
      });
    }
    },
      loginOrJump(pageUrl) {
      if (!this.hasLogin) {
        uni.navigateTo({
          url: "/pages/login/login",
        });
      } else if (pageUrl) {
        uni.navigateTo({
          url: pageUrl,
        });
      }
    },
    changeMsgState(item) {
      this.msgState.index = item.index;
    },
    search() {
      console.log(this.keyword)
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding-left: 0px;
  padding-right: 0px;
  font-size: 12px;
}
.search-box {
  background: #f1f4f5;
  padding: 17rpx 15rpx 0;
}
.time {
  height: 25rpx;
  margin: 15rpx;
}
.u-list {
  height: calc(100vh - 300rpx) !important;
}
.list-item {
  margin: 0 auto;
  width: 719rpx;
  min-height: 165rpx;
  background: #ffffff;
  border-radius: 17rpx;
  padding: 10rpx 28rpx;
  box-sizing: border-box;

  .title {
    width: 144px;
    height: 22px;
    font-size: 16px;
    font-weight: bold;
    color: #333333;
    padding: 30rpx 0rpx ;
    line-height: 22px;
    display: flex;
    justify-content: space-between;
    .tag{
      line-height: 22px;
    }
  }
  .account {
    height: 46rpx;
    line-height: 46rpx;
    font-size: 33rpx;
    color: #333333;
    display: flex;
    justify-content: space-between;
    .account-box{
    border: 1px solid #F3F4FB;
    background: #F3F4FB;
    }
    .account-text{
    font-size: 12px;
    font-weight: 400;
    color: #717477;
    line-height: 18px;
    display: flex;
    }
  }

  .record {
    margin-top: 23rpx;
    display: flex;
    justify-content: space-between;
    height: 29rpx;
    font-size: 29rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #717477;
    line-height: 29rpx;
     padding: 0rpx 0rpx 20rpx 0rpx;
    .record-img{
      margin-right:10rpx;
    }
  }
}
</style>