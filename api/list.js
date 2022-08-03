
const { http } = uni.$u

//获取用户待办列表
export const getToDoList = params => http.get('/bpm/task/todo-page', { params })
//认领待办
export const getClaim = params => http.put('bpm/task/claim',  params )

//获取用户已办列表
export const getHaveDoList = params => http.get('/bpm/task/done-page', { params })