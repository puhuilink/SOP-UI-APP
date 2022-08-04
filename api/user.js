//请求工具参考https://ext.dcloud.net.cn/plugin?id=392
const { http } = uni.$u

//获取用户信息
export const getUserInfo = params => http.get('/system/user/profile/get', params)
//修改用户头像
export const updateAvatar = data => http.request({
  url: '/system/user/profile/update-avatar',
  method: 'PUT',
  data
})

//修改用户昵称
export const updateNickname = params => http.put('/system/user/profile/update', {}, { params })
