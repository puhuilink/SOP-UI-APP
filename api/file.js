const { http } = uni.$u
import config from '@/common/config'
//上传文件
export function uploadFile(params) {
  return new Promise((resolve, reject) => {
		//上传图片
    uni.uploadFile({
      header : config.header,
      url: config.baseUrl+ '/infra/file/upload',
      filePath: params.url,
      name: 'file',
      formData: {
        path: params.path
      },
      success: (res) => {
				//返回的是字符需要转json
				resolve(JSON.parse(res.data))
			},
			fail: (res) => {
				reject
			}
     })
	})
 
}
//上传文件
// export const uploadFile = params => http.post('/infra/file/upload', { params })
//删除文件
export const deleteFile = params => http.delete('/infra/file/delete', { params })

//下载文件（接口暂未实现，需等待对接）
export function DownloadFile(url) {
	uni.downloadFile({
		url: url,  //下载地址
		success: (data) => {
			if (data.statusCode === 200) {
				//文件保存到本地
				uni.saveFile({
					tempFilePath: data.tempFilePath, //临时路径
					success: function(res) {
						uni.showToast({
							icon: 'none',
							mask: true,
							title: '文件已保存：' + res.savedFilePath, //保存路径
							duration: 3000,
						});
						setTimeout(() => {
							//打开文档查看
							uni.openDocument({
								filePath: res.savedFilePath,
								success: function(res) {
									// console.log('打开文档成功');
								}
							});
						}, 3000)
					}
				});
			}
		},
		fail: (err) => {
			console.log(err);
			uni.showToast({
				icon: 'none',
				mask: true,
				title: '失败请重新下载',
			});
		},
	});
}


