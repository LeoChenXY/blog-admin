// 接口函数库文件 对接口发起请求的函数

// 导入axios模块
import axios from 'axios'

// #region 设置一个公共的请求拦截器 统一为所有请求添加请求头
axios.interceptors.request.use(function(config) {
  // Do something before request is sent
  // console.log(config)
  config.headers = {
    // 'Authorization': localStorage.getItem('token'),
    // 'Content-Type': 'application/x-www-form-urlencoded'
  }
  return config
}, function(error) {
  return Promise.reject(error)
})
// #endregion

// #region token过期处理
axios.interceptors.response.use(function(res) {
  // Do something before request is sent
  // console.log(res)
  // eslint-disable-next-line eqeqeq
  /* if (res.data.meta.status == 401 & res.data.meta.msg == '无效token') {
    // 强制清空旧token信息
    localStorage.removeItem('token')
    // 跳转到登录页面 BOM location修改地址栏信息
    location.href = '#/login'
  } */
  return res
}, function(error) {
  return Promise.reject(error)
})
// #endregion

// #region 设置公共基准路径
axios.defaults.baseURL = 'http://blogserver.com/index.php/admin'
// #endregion

// #region 封装登录验证 请求函数
export var verify = function(data) {
  return axios.post('login', data).then(res => {
    return res.data
  })
}
// #endregion

// //////////////////////////////////
// /////////////////////////////////

// #region 用户管理

// #region 封装查询用户信息列表接口函数
export var getManagerList = (pagenum, pagesize, query = '') => {
  return axios.get('/manager/getAllManager', {
    params: {
      pagenum,
      pagesize,
      query
    }
  }).then(res => {
    return res.data
  })
}
// #endregion

// #region 封装新增用户接口函数
export var addManager = function(data) {
  return axios.post('/manager/addManager', data).then(res => {
    return res.data
  })
}
// #endregion

// #region 封装删除用户接口函数
export var delManager = function(id) {
  // console.log(id)
  return axios.delete(`/manager/delManager?manager_id=${id}`).then(res => {
    return res.data
  })
}
// #endregion

// #region 封装修改用户接口函数
export var editManager = (id, data) => {
  console.log(data)
  return axios.put(`/manager/updateManager?manager_id=${id}`, data).then(res => {
    return res.data
  })
}
// #endregion

// #region 封装根据用户id查询用户信息接口函数
export var getUserById = (id) => {
  return axios.get(`users/${id}`).then(res => {
    return res.data
  })
}
// #endregion

// #region 修改用户状态（是否启用）
export var changeUserState = (uid, type) => {
  return axios.put(`users/${uid}/state/${type}`).then(res => {
    return res.data
  })
}
// #endregion

// #endregion

// //////////////////////////////////
// /////////////////////////////////

// #region 权限管理

// #region 所有权限列表
export var rights = (type) => {
  return axios.get(`rights/${type}`).then(res => {
    return res.data
  })
}
// #endregion

// #region 左侧菜单权限
export var menusRight = () => {
  return axios.get('menus').then(res => {
    return res.data
  })
}
// #endregion

// #endregion

// //////////////////////////////////
// /////////////////////////////////

// #region 角色管理

// #region 封装查询分配用户角色接口函数
export var getUserRole = () => {
  return axios.get('roles').then(res => {
    return res.data
  })
}

// #endregion

// #region 封装分配用户角色接口函数
export var setUserRole = (data) => {
  return axios.put(`users/${data.id}`)
}
// #endregion

// #region 根据ID查询用户角色
export var getUserRoleById = (rid) => {
  return axios.get(`roles/${rid}`).then(res => {
    return res.data
  })
}
// #endregion

// #endregion
