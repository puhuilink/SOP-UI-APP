import Vue from 'vue'
import App from './App'

// 引入全局uView
import uView from '@/uni_modules/uview-ui'
// 引入echarts
import * as echarts from 'echarts'


//国际化
import VueI18n from 'vue-i18n'
import messages from './lang/index.js'
Vue.use(VueI18n)
const i18n = new VueI18n({  
  locale: localStorage.getItem('language') ? localStorage.getItem('language') : 'zh-CN',  // 默认选择的语言中文
  messages 
})
Vue.prototype._i18n = i18n
Vue.config.productionTip = false
// vuex
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$store = store



App.mpType = 'app'
Vue.use(uView)

const app = new Vue({
  i18n,
	store,
	...App
})

// 引入请求封装
require('./utils/request/index')(app)

app.$mount()
