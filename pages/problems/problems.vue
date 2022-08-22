<template>
  <view class="container">
    <Navbar title="常见问题" />
    <view class="problems" v-for="(item, i) in list" :key="`problems${i}`">
      <view class="title" @click="showProblems(i)">
        <view class="icon">Q{{ i + 1 }}</view>
        <view class="text">{{ item.title }}</view>
        <u-icon :name="item.show ? 'arrow-up' : 'arrow-down'" size="16" />
      </view>
      <template v-if="item.show">
        <view class="content">
          <view class="icon">A1</view>
          <view class="text">
            <view
              v-for="(itemA, x) in item.problems"
              :key="`problemsItem${x}`"
              >{{ itemA }}</view
            >
          </view>
        </view>
      </template>
    </view>
    <u-gap height="20rpx" />
    <Tabbar indexBar="problems" />
  </view>
</template>

<script>
import Navbar from "@/components/navbar/navbar";
import Tabbar from "@/components/tabbar/tabbar";
export default {
  name: "problems",
  components: {
    Navbar,
    Tabbar,
  },
  data() {
    return {
      list: [
        {
          show: false,
          title: "IP地址冲突，无法上网怎么更改IP地址？",
          problems: [
            "1. 右键点击网络图标打开inter设置，打开网络共享中心。",
            "2. 选择更改适配器设置。",
            "3.选择以太网，右键属性，双击IPV4设置，配置正确的IP地址。地址为固定的10.1.X.Y。X为固定网段（可以查看同屋其他电脑IP），Y为1-253任意，掩码固定255.255.255.0，网关为10.1.X.254（必须与IP的X相同），DNS主10.1.1.5备10.1.1.2，若提示地址冲突，则仅IP向后调整一位（Y+1）。如果IP获取方式为自动获取，则需要改为手动添加，然后配置正确地址。如果出现红叉则需要运维人员或者物业人员排查线路故障。",
          ],
        },
        {
          show: false,
          title: "Word文档提示宏病毒怎么关闭？",
          problems: [
            "遇到excel打开时提示宏病毒，需要打开“文件－选项－信任中心－宏设置－禁用所有宏点上把ＶＢＡ前的勾去掉”，如果无效需要运维人员现场查看。",
          ],
        },
        {
          show: false,
          title: "台式机开机屏幕不亮，怎么排查？",
          problems: [
            "排查电源线、墙插是否正常。排查VGA连接线是否正常，是否连接到主机独立显卡接口。如果无效需要运维人员现场查看。（左图红框内为独立显卡接口、右图左侧为电源接口，右侧VGA接口）。？",
          ],
        },
        {
          show: false,
          title: "怎么创建好视通会议室号？",
          problems: [
            "不是每一个人都可以直接创建会议室号，需要找到好视通管理员创建会议室号。管理员创建的会议室号是唯一的、也是永久的。",
          ],
        },
      ],
    };
  },
  onLoad() {},
  computed: {},
  methods: {
    showProblems(i) {
      let show = this.list[i].show;
      this.list = this.list.map((item, index) => {
        if (index === i) {
          item.show = !show;
        } else {
          item.show = false;
        }
        return item;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.problems {
  margin: 23rpx auto 0;
  width: 719rpx;
  min-height: 100rpx;
  background: #ffffff;
  border-radius: 21rpx;
  padding: 0 24rpx;
  box-sizing: border-box;

  .icon {
    height: 48rpx;
    width: 48rpx;
    font-size: 29rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 35rpx;
    text-align: center;
  }

  .title {
    padding: 26rpx 0;
    min-height: 100rpx;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    font-size: 29rpx;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #333333;
    line-height: 42rpx;
    .icon {
      background: url(../../static/images/problems/icon1.png) no-repeat;
      background-size: 100% 100%;
    }
    .text {
      flex: 1;
      margin: 0 30rpx;
    }
  }

  .content {
    padding: 4rpx 0 38rpx;
    box-sizing: border-box;
    display: flex;
    .icon {
      background: url(../../static/images/problems/icon2.png) no-repeat;
      background-size: 100% 100%;
    }
    .text {
      flex: 1;
      margin-left: 30rpx;
      font-size: 29rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 42rpx;
    }
  }
}
</style>
