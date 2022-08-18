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
export function getCard(quantity,roleId) {
  return service.get('/card/getInitCard', {
    headers: { 'Content-Type': 'application/json' },
    params: {
      quantity: quantity,
      roleId:roleId
    }
  })
}

// 获取角色
export function getRole(id) {
  return service.get('/playerRole/getRole', {
    headers: { 'Content-Type': 'application/json' },
    params: {
      id: id
    }
  })
}
// 初始化怪物
export function initMonster(id,roleId) {
  return service.get('/monster/initMonster', {
    headers: { 'Content-Type': 'application/json' },
    params: {
      id: id,
      roleId: roleId
    }
  })
}

// 基础攻击牌
export function attack(monsterId,roleId,cardId) {
  return service.get('/battle/attack', {
    headers: { 'Content-Type': 'application/json' },
    params: {
      monsterId: monsterId,
      roleId: roleId,
      cardId:cardId
    }
  })
}
// 基础治疗
export function heal(roleId,cardId) {
  return service.get('/battle/heal', {
    headers: { 'Content-Type': 'application/json' },
    params: {
      roleId: roleId,
      cardId:cardId
    }
  })
}
// 基础叠甲
export function increaseArmor(roleId,cardId) {
  return service.get('/battle/increaseArmor', {
    headers: { 'Content-Type': 'application/json' },
    params: {
      roleId: roleId,
      cardId:cardId
    }
  })
}
// 怪物攻击
export function underAttack(monsterId,roleId) {
  return service.get('/battle/underAttack', {
    headers: { 'Content-Type': 'application/json' },
    params: {
      monsterId: monsterId,
      roleId: roleId,
    }
  })
}
// 卡池抽卡
export function drawCard(quantity,roleId) {
  return service.get('/card/drawCard', {
    headers: { 'Content-Type': 'application/json' },
    params: {
      quantity: quantity,
      roleId: roleId,
    }
  })
}

// 背包添加卡牌
export function roleAddCard(roleId,cardId) {
  return service.get('/playerRole/roleAddCard', {
    headers: { 'Content-Type': 'application/json' },
    params: {
      roleId: roleId,
      cardId: cardId
    }
  })
}

// 删除卡牌缓存
export function refreshCardCache(roleId) {
  return service.get('/card/refreshCardCache', {
    headers: { 'Content-Type': 'application/json' },
    params: {
      roleId: roleId,
    }
  })
}

// 获取地图
export function getMap(id) {
  return service.get('/gameLevel/getMap', {
    headers: { 'Content-Type': 'application/json' },
    params: {
      id:id
    }
  })
}
// 过关增加关卡
export function updateLayer(roleId) {
  return service.get('/playerRole/updateLayer', {
    headers: { 'Content-Type': 'application/json' },
    params: {
      roleId: roleId
    }
  })
}

// 过关增加关卡
export function getMyCard(roleId) {
  return service.get('/playerRole/getMyCard', {
    headers: { 'Content-Type': 'application/json' },
    params: {
      roleId: roleId
    }
  })
}
//buy
export function buy (roleId,price) {
  return service.get('/trade/decrease', {
    headers: {
      'Content-Type': 'application/json'
    },
    params: {
      roleId: roleId,
      price: price
    }
  })
}
