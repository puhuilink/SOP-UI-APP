const { http } = uni.$u

//待办审批通过
export const getApprove = params => http.put('/bpm/task/approve',  params )

//待办审批不通过
export const getReject = params => http.put('/bpm/task/reject',  params )