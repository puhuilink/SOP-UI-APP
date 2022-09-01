const { http } = uni.$u

//待办审批通过
export const getApprove = params => http.put('/bpm/task/approve',  params )

//待办审批第一次不通过
export const getReject = params => http.put('/bpm/task/reject',  params )
//待办审批第二次及以上不通过
export const getBack = params => http.put('/bpm/task/roll-back',  params )

//获取流程节点
export const getInstanceId = params => http.get('/so/bpm/task/list-by-process-instance-id', { params })
