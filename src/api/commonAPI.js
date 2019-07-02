// #region 公共自定义方法

// #region 引入模块
/*
*   @Vue    引入vue框架
*/
import Vue from 'vue'
// #endregion

// #region 封装公共消息提示方法
/*
*@params1 myself    {object}    传入this即可
*@params2 type      {string}    消息提示框显示类型（success，error，info，warning）
*@params2 message   {string}    需要显示的内容
*/
export var comMsg = function(mySelf, type, message) {
  mySelf.$message({
    type: type,
    message: message,
    center: true,
    showClose: true
  })
}
// #endregion

// #region 封装公共消息提示方法(传对象参数)
/*
*@params1 myself    {object}    传入this即可
*@params2 type      {string}    消息提示框显示类型（success，error，info，warning）
*@params2 message   {string}    需要显示的内容
*/
export var comMsgObject = function(mySelf, object) {
  // console.log(object)
  mySelf.$message({
    type: object.type,
    message: object.message,
    center: object.center,
    showClose: object.showClose
  })
}
// #endregion

// #region 封装事件格式化方法
export var formatDateTime = (dateTime) => {
  // eslint-disable-next-line no-redeclare
  var dateTime = new Date(dateTime)

  var year = dateTime.getFullYear()
  // uc浏览器不能解析padStart()方法
  /*
    var mon = (dateTime.getMonth()+1).toString().padStart(2,0)
    var day = (dateTime.getDate()).toString().padStart(2,0)
    var hour = (dateTime.getHours()).toString().padStart(2,0)
    var min = (dateTime.getMinutes()).toString().padStart(2,0)
    var sec = (dateTime.getSeconds()).toString().padStart(2,0)
    */

  // 改造版
  var mon = formatDTLength(dateTime.getMonth() + 1)
  var day = formatDTLength(dateTime.getDate())
  var hour = formatDTLength(dateTime.getHours())
  var min = formatDTLength(dateTime.getMinutes())
  var sec = formatDTLength(dateTime.getSeconds())
  return `${year}/${mon}/${day}  ${hour}:${min}:${sec}`
}
// #endregion

// #region 格式化时间日期的长度
export var formatDTLength = (dateTime) => {
  var newDT = dateTime < 10 ? '0' + dateTime : dateTime
  return newDT
}
// #endregion

// #region 将数据转换成树形数据
export var treeToArray = (
  data,
  expandAll,
  parent = null,
  level = null
) => {
  let tmp = []
  Array.from(data).forEach(function(record) {
    if (record._expanded === undefined) {
      Vue.set(record, '_expanded', expandAll)
    }
    let _level = 1
    if (level !== undefined && level !== null) {
      _level = level + 1
    }
    Vue.set(record, '_level', _level)
    // 如果有父元素
    if (parent) {
      Vue.set(record, 'parent', parent)
    }
    tmp.push(record)
    if (record.child && record.child.length > 0) {
      const child = treeToArray(record.child, expandAll, record, _level)
      tmp = tmp.concat(child)
    }
  })
  return tmp
}
// #endregion

// #region 手机号验证
export var validPhone = (telphone) => {
  console.log(telphone)
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
  return reg.test(telphone)
}
// #endregion

// #endregion

