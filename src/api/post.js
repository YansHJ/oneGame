// 导入axios配置
import service from '../utils/request'


//生成文字分享 （同时在params及body中携带参数）
export function createMsg (token,obj) {
  return service.post('/msg/createMsg', JSON.stringify(obj), {
    headers: {
      'Content-Type': 'application/json',
      'token': sessionStorage.getItem('access_token')
    },
    params: {
      token: token
    }
  })
}
