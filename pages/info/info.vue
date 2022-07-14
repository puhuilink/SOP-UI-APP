<template>
	<view class="container">
   <u-navbar
            title="消息"
            @rightClick="rightClick"
            :autoBack="true"
           rightIcon="search"
        > 
        </u-navbar>
        <view class="division"></view>
        <u-search shape="round"></u-search>
           <view class="division"></view>
        <u-sticky bgColor="#fff">
    <u-tabs :list="list1"></u-tabs>
     <view class="division"></view>
      <u-list>
        <u-list-item
			  v-for="(item,index) in listData" :key="index" 
			>
      <u-col span="12" >
        	<view class="time"> {{item.published_at }} </view>
      </u-col>
     
    <u-cell
     :title="item.title" 
     :label="item.author_name"  
    >  
   	<!-- <u-icon slot="icon"  name="search" class="style"></u-icon> -->
     <template slot="value">
			<span class="right-top">{{item.id}}</span>
      	<span class="right-bottom">{{item.name}}</span>
		</template></u-cell>
 

        </u-list-item>  
          </u-list>
  </u-sticky>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        	type:"warning",
			value:100,
  list1: [{
                    name: '已读',
                }, {
                    name: '未读',
                }],
                 listData: [{
                        id: "S20220531199",                       
                        title: "01-财务账号问题",
                        author_name: "二线人员王明已处理",
                        name: "记录人高得",
                        published_at: "2022-07-22 08:19"
                    },
                    {
                        id: "S20220531199",                       
                        title: "02-财务账号问题",
                        author_name: "二线人员王明已处理",
                        name: "记录人李雷",
                        published_at: "2022-07-23 08:19"
                    },
                    {
                        id: "S20220531199",                       
                        title: "03-财务账号问题",
                        author_name: "二线人员王明已处理",
                        name: "记录人王露",
                        published_at: "2022-07-24 08:19"
                    },
                    {
                         id: "S20220531199",                       
                        title: "04-财务账号问题",
                        author_name: "二线人员王明已处理",
                        name: "记录人高得",
                        published_at: "2022-07-25 08:19"
                    }
                ],
			};
		},
		methods: {
         rightClick() {
            console.log('rightClick');
        },
        leftClick() {
            console.log('leftClick');
        }
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		padding-left: 0px;
		padding-right: 0px;
		font-size: 12px;
	}
	.container {
		padding-bottom: 80px;
	}
  .division {
    height: 10px;
  }
// .style{
//   position:absolute;
//    top:30px ;
//   left:0px;
// }
     .right-top{
      margin-top:-20px;
      margin-right: -70px;
     }
     .right-bottom{
       margin-bottom:-30px;
height: 14px;
font-size: 14px;
color: #878B8F;
     }
     .time{
      margin-top: 10px;
      text-align: center;
height: 17px;
font-size: 12px;
font-family: PingFangSC-Regular, PingFang SC;
font-weight: 400;
color: #AFB1B5;
line-height: 17px;
     }
</style>