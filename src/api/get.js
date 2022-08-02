import service from '../utils/request'

// 登录
export function loginLogin(username, password) {
  return service.get('/login/login', {
    headers: { 'Content-Type': 'application/json' },
    params: {
      username: username,
      password: password
    }
  })
}
// 抽卡
export function getCard(quantity) {
  return service.get('/card/getInitCard', {
    headers: { 'Content-Type': 'application/json' },
    params: {
      quantity: quantity
    }
  })
}

// 抽卡
export function getRole(id) {
  return service.get('/playerRole/getRole', {
    headers: { 'Content-Type': 'application/json' },
    params: {
      id: id
    }
  })
}
