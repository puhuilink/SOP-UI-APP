import Vue from 'vue'
import App from './App'

// 引入全局uView
import uView from '@/uni_modules/uview-ui'

//国际化
import VueI18n from 'vue-i18n'
import messages from './common/lang.js'
Vue.use(VueI18n)
const i18n = new VueI18n({  
  locale: localStorage.getItem('language') === '1' ||  localStorage.getItem('language') === null ? 'zh-CN' : 'en-US',  // 默认选择的语言(1:中文,2:英文<这里默认中文>)
  messages 
})
Vue.prototype._i18n = i18n
Vue.config.productionTip = false
// vuex
import store from './store'

Vue.config.productionTip = false
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
