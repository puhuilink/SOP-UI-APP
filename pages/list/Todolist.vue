<template>
	<view>
		<view class="uni-container">
			<uni-table ref="table" :loading="loading" border stripe  emptyText="暂无更多数据">
				<uni-tr>
					<uni-th   align="center">工单编号</uni-th>
					<uni-th  align="center">标题</uni-th>
					<uni-th align="center">优先级</uni-th>
					<uni-th  align="center">记录人</uni-th>
          <uni-th  align="center">状态更新时间</uni-th>
				</uni-tr>
				<uni-tr v-for="(item, index) in tableData" :key="index">
					<uni-td>{{ item.processInstance.id }}</uni-td>
					<uni-td>
					{{ item.processInstance.name }}
					</uni-td>
          	<uni-td>
					{{ item.suspensionState }}
					</uni-td>
          	<uni-td>
					{{ item.processInstance.startUserNickname }}
					</uni-td>
        
				<uni-td >{{item.createTime }}</uni-td>
				</uni-tr>
			</uni-table>
			<view class="uni-pagination-box"><uni-pagination show-icon :page-size="pageSize" :current="pageNo" :total="total" @change="change" /></view>
		</view>
	</view>
</template>


<script>
import { getToDoList } from '@/api/list.js'
export default {
  name: 'Todolist',
	data() {
		return {
	     tableData:[],
			// 每页数据量
			pageSize: 10,
			// 当前页
			pageNo: 1,
			// 数据总量
			total: 0,
			loading: false
		}
	},
	onLoad() {
		this.selectedIndexs = []
    this.getTodolist()
	},
	methods: {
    //转换时间戳
    formatDate(timeStamp) {
      var date = new Date(timeStamp);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? ('0' + minute) : minute;
      second = second < 10 ? ('0' + second) : second;
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    },
    // 获取列表
  async  getTodolist() {
      this.loading = true
    await  getToDoList({
        pageSize: this.pageSize,
        pageNo: this.pageNo
      }).then(res => {
     this.tableData = res.data.list
      //res.data.list的时间戳转换
      this.tableData.forEach(item => {
        item.createTime = this.formatDate(item.createTime)
      })
     this.total = res.data.total
       this.loading = false
      })
    },
		// 分页触发
	async	change(e) {
			this.$refs.table.clearSelection()
      this.pageNo = e.current
			this.getTodolist()
		},
	}
}
</script>


<style lang="scss">
/* #ifndef H5 */
.page {
	padding-top: 85px;
}
/* #endif */
</style>

