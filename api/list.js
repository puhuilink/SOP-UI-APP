
const { http } = uni.$u

//获取用户待办列表
export const getToDoList = params => http.get('/so/bpm/task/todo-page', { params })

//获取用户待办列表详情
export const getToDoListDetail = params => http.get('/so/bpm/task/get-by-id', { params })

//认领待办
export const getClaim = params => http.put('/so/bpm/task/claim',  params )

//获取用户已办列表
export const getHaveDoList = params => http.get('/so/bpm/task/done-page', { params })