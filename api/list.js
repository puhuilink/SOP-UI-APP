
const { http } = uni.$u

//获取用户待办列表
export const getToDoList = params => http.get('/so/bpm/task/todo-page-app', { params })

//获取用户待办列表详情
export const getToDoListDetail = params => http.get('/so/bpm/task/get-by-id', { params })

//认领待办
export const getClaim = params => http.put('/so/bpm/task/claim',  params )

//获取用户已办列表
export const getHaveDoList = params => http.get('/so/bpm/task/done-page-app', { params })

//获得消息管理
export const getInformation = params => http.get('/so/information/get', { params })

//更新消息管理状态

export const getUpdate = params => http.put('/so/information/update',  params )

//获取消息未读列表
export const getUnreadPage = params => http.get('/so/information/unread-page', { params })

//获取消息已读列表

export const getReadPage = params => http.get('/so/information/read-page', { params })
