module.exports = {
  //后端接口地址
  baseUrl: 'http://122.9.133.170:48080/admin-api',
  // 超时
  timeout: 30000,
  // 禁用 Cookie 等信息
  withCredentials: false,
  header: {
    //租户ID
    'tenant-id': 1
  }
}
