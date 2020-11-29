import request from './base'


// 获取验证码
export const getCode = (params, cb) => {
  request('api/v1/verificationCodes/phone', params, cb, 'post')
}

//注册
export const registerBtn = (params, cb) => {
  request('api/v1/weapp/users',params,cb,'post')
}

//账号密码登录
export const loginPass = (params, cb) => {
  request('api/v1/weapp/authorizations', params, cb, 'post')
}

//手机号验证码登录
export const loginCode = (params, cb) => {
  request('api/v1/weapp/athorizations/phone', params, cb, 'POST')
}

//登录改
export const loginNew = (params, cb) => {
  request('api/v1/weapp/users', params, cb, 'POST')
}

//刷新tocken值
export const getTockenN= (params, cb) => {
  request('api/v1/authorizations/current', params, cb, 'put')
}

//获取tocken值
export const getTocken = (params, cb) => {
  request('api/v1/weapp/authorizations', params, cb, 'post')
}

//手机号校验是否绑定一标三实
export const verificationPhone = (params, cb) => {
  request('api/v1/security/phone', params, cb, 'post')
}

//获取小区
export const getVillage = (params, cb) => {
  request('api/v1/communities', params, cb, 'post')
}
//获取楼栋
export const getBuildings = (params, cb) => {
  request('api/v1/buildings', params, cb, 'post')
}
//获取单元
export const getUnits = (params, cb) => {
  request('api/v1/units', params, cb, 'post')
}
//获取楼层
export const getFloor = (params, cb) => {
  request('api/v1/floors', params, cb, 'post')
}
//获取房间号
export const getRoom = (params, cb) => {
  request('api/v1/houses', params, cb, 'post')
}
//查询该房间是否绑定业主
export const yezhu = (params, cb) => {
  request('api/v1/security/yezhu', params, cb, 'post')
}
//绑定小区初始化
export const bellInitialize = (params, cb) => {
  request('api/v1/weapp/initialize', params, cb, 'post')
}
//提交一标三实
export const yibiaosanshi = (params, cb) => {
  request('api/v1/weapp/yibiaosanshi', params, cb, 'post')
}
//业主手机校验
export const yezhuCode = (params, cb) => {
  request('api/v1/security/yezhu-code', params, cb, 'post')
}
//小区列表
export const housesList = (params, cb) => {
  request('api/v1/user/housesList', params, cb, 'post')
}

//小区详情
export const housesDetails = (params, cb) => {
  request('api/v1/house/detail', params, cb, 'post')
}

//身份证验证
export const idcard = (params, cb) => {
  request('api/v1/idcard/photo', params, cb, 'post')
}

//获取新角色
export const getRoles = (params, cb) => {
  request('api/v1/people/roles', params, cb, 'post')
}

