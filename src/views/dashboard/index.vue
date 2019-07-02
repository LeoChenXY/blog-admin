<template>
<div class="body">
  <center>
    <img src="../../assets/images/usericon.jpg">
    <h1>Amazing-Shop 后台管理系统</h1>
    <div class="text-center">
      <a href="https://github.com/LeoChenXY" target="_blank">
        <el-button type="primary" size="max" round plain>Github</el-button>
      </a>&nbsp;&nbsp;
      <a href="javascript:;">
        <el-button type="success" size="max" round plain>关于我</el-button>
      </a>
    </div>
  </center>
 
</div>
</template>
<script type="text/javascript">
export default {
  name: 'home',
  created () {
    // 设置浏览器标签页名称
    document.title = '主页面 -- Amazing-Shop'
  }
}
</script>

<style lang="scss" scope>
  .body{
    background: #e9eef3;
    img{
      margin-top: 50px;
      width: 200px;
      border-radius: 50%;
    }
    h1{
      font-weight: 100;
      font-size: 35px;
      margin: 50px 0;
    }
    .test{
      height: 40px;
      background: #ccc;
      margin-bottom: 15px;
    }
  }
</style>
