//请求工具参考https://ext.dcloud.net.cn/plugin?id=392
const { http } = uni.$u

// 获取滚动图数据
export const getBannerData = params => http.get('/index', { params })
// 获取滚动通知数据
export const getNoticeData = params => http.get('/notice', { params })
//获取服务目录数据
export const getList = params => http.get('/so/dir/page', { params } )
//通过服务目录id获取模型
export const getByDir = params => http.get('so/model/get-by-dir', { params })
//通过表单id拿到表单
export const getFrom = params => http.get('/bpm/form/get', { params })
//根据表单创建工单
export const getCreate = params => http.post('/so/work-order/create',  params )
//获得未读消息数量
export const getUnreadNum = params => http.get('/so/information/getUnreadNum')